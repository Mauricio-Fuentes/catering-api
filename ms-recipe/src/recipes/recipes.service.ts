import { Inject, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RecipesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('RecipesService');

  constructor(@Inject(NATS_SERVICE) private readonly clientNats: ClientProxy) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('DataBase connected');
  }

  async create(createRecipeDto: CreateRecipeDto) {
    try {
      // validar que los productos existan
      this.logger.log(`Validar los ids de los productos`);
      const productsId = createRecipeDto.products.map((item) => item.productId);
      this.logger.log(`Calidando los productos ${productsId.join(', ')}`);
      const products: any[] = await firstValueFrom(
        this.clientNats.send({ cmd: 'validate_products' }, productsId),
      );
      this.logger.log(`Productos ${JSON.stringify(products)}`);

      // crear la receta
      const recipe = await this.recipe.create({
        data: {
          description: createRecipeDto.description,
          createdAt: new Date(),
          detailRecipe: {
            createMany: {
              data: createRecipeDto.products.map((productRecipe) => ({
                productid: productRecipe.productId,
                quantity: productRecipe.quantity,
                createdAt: new Date(),
              })),
            },
          },
        },
        include: {
          detailRecipe: {
            select: {
              recipeId: true,
              productid: true,
              quantity: true,
            },
          },
        },
      });

      // crear el detalle de la receta
      return {
        ...recipe,
        detailRecipe: recipe.detailRecipe.map((productRecipe) => ({
          ...productRecipe,
          name: products.find(
            (product) => product.id === productRecipe.productid,
          ).name,
        })),
      };
    } catch (error) {
      this.logger.error('Error creating order', error);
      throw new RpcException({
        status: error.status,
        message: error.message,
      });
    }
  }

  async findAll(orderPaginationDto: PaginationDto) {
    const {page, limit} = orderPaginationDto;
    const totalPages = await this.recipe.count();
    const totalPage = Math.ceil(totalPages / limit);
    return {
      data: await this.recipe.findMany({
        skip: (page - 1) * limit,
        take: limit
      }),
      metadata: {
        total: totalPages,
        page: page,
        totalPage: totalPage
      }
    };
  }

  async findOne(id: number) {
    const recipe = await this.recipe.findUnique({
      where: {
        id: id
      }
    });

    if(!recipe) {
      throw new NotFoundException(`Recipe id ${id} not found`);
    }

    return recipe;
  }

  async update(updateRecipeDto: UpdateRecipeDto) {
    const {id, ...recipe} = updateRecipeDto;

    await this.findOne(id);

    return this.recipe.update({
      where: {
        id: id
      },
      data: recipe
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    const recipe = await this.recipe.delete({
      where: {
        id: id
      }
    });
    return recipe;
  }
}
