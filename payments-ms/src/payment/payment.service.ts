import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaClient } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PaymentService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('PaymentService');

  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  create(createPaymentDto: CreatePaymentDto) {
    try {
      this.logger.log('Creating a new payment with data:', createPaymentDto);

      const payment = this.payment.create({
        data: {
          planid: createPaymentDto.planId,
          amount: createPaymentDto.amount,
          currency: createPaymentDto.currency,
          status: createPaymentDto.status,
        }
      });

      this.logger.log('Creating payment in the database');

      return payment;
    } catch (error) {
      this.logger.error('Error creating payment', error);
      this.logger.error('Error details:', error.message, error.stack);
      throw new RpcException({
        status: error.status,
        message: error.message,
      });
      
    }
    
  }

  async findAll(paginationDto: PaginationDto) {
    this.logger.log(`Fetching all payments with pagination: ${JSON.stringify(paginationDto)}`);

    const {page, limit} = paginationDto;
    const totalPages = await this.review.count();
    const totalPage = Math.ceil(totalPages / limit);
    this.logger.log('Retrieving all payments');
    try {
      return {
        data: await this.payment.findMany({
          skip: (page - 1) * limit,
          take: limit,
        }),
        metadata: {
          totalPages,
          currentPage: page,
          totalItems: totalPage,
        },
      }
    } catch (error) {
      this.logger.error('Error fetching payments', error);
      throw new RpcException({
        status: error.status,
        message: error.message,
      });
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
