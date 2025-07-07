import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePlanTypeDto } from './dto/create-plan-type.dto';
import { UpdatePlanTypeDto } from './dto/update-plan-type.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from './dto/PaginationDto';

@Injectable()
export class PlanTypeService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('PlanTypeService');

  constructor(){
    super();
  }
  
  async onModuleInit() {
    await this.$connect();
    this.logger.log('DataBase connected');
  }

  async create(createPlanTypeDto: CreatePlanTypeDto) {
    this.logger.log(`Creado el plan Type`);
    const planType = await this.plantType.create({
      data: {
        description: createPlanTypeDto.description,
        amount: createPlanTypeDto.amount,
        discount: createPlanTypeDto.discount,
        currency: createPlanTypeDto.currency,
        createdAt: new Date(),
        DetailPlanType: {
          create: createPlanTypeDto.recipes.map((recipe) => ({
            recipeid: recipe,
            createdAt: new Date()
          }))
        }
      },
      include: {
        DetailPlanType: true
      }
    });

    this.logger.log(`plan type created ${JSON.stringify(planType)}`);
    
    return planType;
  }

  async findAll(planTypePaginationDto: PaginationDto) {
    const {page, limit} = planTypePaginationDto;
    const totalPages = await this.recipe.count();
    const totalPage = Math.ceil(totalPages / limit);
    return {
      data: await this.plantType.findMany({
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

  async findOne(id: any) {
    const planType = await this.plantType.findUnique({
      where: {
        id: id.id
      }
    });

    if(!planType) {
      throw new NotFoundException(`PlanType id ${id} not found`);
    }

    return planType;
  }

  update(id: number, updatePlanTypeDto: UpdatePlanTypeDto) {
    return `This action updates a #${id} planType`;
  }

  remove(id: number) {
    return `This action removes a #${id} planType`;
  }
}
