import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
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

  async findOne(id: number) {
    try {
      const payment = await this.payment.findFirst({
        where: {id}
      });

      this.logger.log(`Payment found with id: ${id}`, payment);

      if(!payment) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: `Payment with id ${id} not found`,
        });
      }

      return payment;
    } catch (error) {
      this.logger.error('Error fetching payment', error);
      throw new RpcException({
        status: error.status,
        message: error.message,
      }); 
    }
  }

  async update(updatePaymentDto: UpdatePaymentDto) {
    try {
      const {id, ...payment} = updatePaymentDto;
      
      const newPayment = await this.payment.update({
        where: {id},
        data: {
          planid: payment.planId,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
        }
      });

      return newPayment;
    } catch (error) {
      this.logger.error('Error updating payment', error);
      throw new RpcException({
        status: error.status,
        message: error.message,
      });
    
    }
    
  }

  async remove(id: number) {
    try {
      const payment = this.payment.findFirst({
        where: {id}
      });
      
      if (!payment) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: `Payment with id ${id} not found`,
        });
      }

      await this.payment.delete({
        where: {id}
      });

      return 'Eliminado';
    } catch (error) {
      this.logger.error('Error removing payment', error);
      throw new RpcException({
        status: error.status,
        message: error.message,
      });
    }
  }
}
