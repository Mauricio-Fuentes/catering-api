import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { RpcException } from '@nestjs/microservices';
import { ProductQuantityDto } from './dto/product.quantity.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('Serivicio de productos');

  onModuleInit() {
      this.$connect();
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    });
  }

  async findAll(request :PaginationDto) {
    const {page, limit} = request;
    const totalPages = await this.product.count({where: {tz_lock:  0}});
    const pageTotal = Math.ceil(totalPages / limit);
    return {
        data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {tz_lock: 0}
      }),
      metadata: {
        total: totalPages,
        page: page,
        lastPage: pageTotal
      }
    }
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: {
        id: id
      }
    });

    if(!product){
      throw new NotFoundException(`Product id ${id} not found`);
    }

    return product;
  }

  async update(updateProductDto: UpdateProductDto) {

    const {id, ...product} = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: {id},
      data: product
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const product = await this.product.update({
      where: {id},
      data: {
        tz_lock: 1
      }
    });

    return product;
  }

  async validateProducts(ids: number[]){
    ids = Array.from(new Set(ids));

    const products = await this.product.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    if(products.length !== ids.length){
      throw new RpcException({
        message: 'Some products were not found',
        status: HttpStatus.BAD_REQUEST
      });
    }

    return products;
  }

  async updateQuantityProducts(productQueantity: ProductQuantityDto){
 
    const {id, quantity} = productQueantity;
    const product = await this.product.findUnique({
      where: {
        id: id
      }
    });
    if(!product){
      throw new RpcException({
        message: `Product with id ${id} not found`,
        status: HttpStatus.NOT_FOUND
      });
    }
    if(product.quantity < quantity){
      throw new RpcException({
        message: `Insufficient stock for product with id ${id}`,
        status: HttpStatus.BAD_REQUEST
      });
    }
    return await this.product.update({
      where: {id},
      data: {
        quantity: product.quantity - quantity
      }
    });
  }
}
