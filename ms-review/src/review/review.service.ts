import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class ReviewService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('RecipesService');

  constructor(@Inject(NATS_SERVICE) private readonly clientNats: ClientProxy) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('DataBase connected');
  }

  create(createReviewDto: CreateReviewDto) {
    try {
      this.logger.log(`Creating a new review with data: ${JSON.stringify(createReviewDto)}`);
      const review = this.review.create({
        data: {
          clientId: createReviewDto.clientId,
          weight: createReviewDto.weight,
          height: createReviewDto.height,
          createdAt: new Date()
        }
      });

      return review;
    }
    catch (error) {
      this.logger.error('Error creating order', error);
      throw new RpcException({
        status: error.status,
        message: error.message,
      });
    }
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
