import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PrismaClient } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PlansService extends PrismaClient implements OnModuleInit {
  
  private readonly logger = new Logger('PlansServices');

  constructor(){
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('DataBase connected');
  }

  create(createPlanDto: CreatePlanDto) {
    try {
      this.logger.log('Creating a new plan with data:', createPlanDto);

      const plan = this.plan.create({
        data: {
          plantypeid: createPlanDto.planTypeId,
          clientid: createPlanDto.clientId,
        },
      });

      this.logger.log('Plan created successfully:', plan);
      
      return plan;

    } catch (error) {
      this.logger.error('Error creating plan', error);
      this.logger.error('Error details:', error.message, error.stack);
      throw new RpcException({
        status: error.status,
        message: error.message,
      }); 
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {page, limit} = paginationDto;
    this.logger.log(`Fetching all reviews with pagination: ${JSON.stringify(paginationDto)}`);
    const totalPages = await this.review.count();
    const totalPage = Math.ceil(totalPages / limit);
    this.logger.log('Retrieving all plans');
    try {
      
      return {
        data: await this.plan.findMany({
          skip: (page - 1) * limit,
          take: limit,
        }),
        metadata: {
          total: totalPages,
          page: page,
          totalPage: totalPage
        }
      };
    } catch (error) {
      this.logger.error('Error retrieving plans', error);
      this.logger.error('Error details:', error.message, error.stack);
      throw new RpcException({
        status: error.status,
        message: error.message,
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
