import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Injectable()
export class ReviewService {

  private readonly logger = new Logger(ReviewService.name);

  constructor(
    @Inject(NATS_SERVICE) private readonly clientNats: ClientProxy
  ) {}

  create(createReviewDto: CreateReviewDto) {
    return this.clientNats.send('createReviewComplete', createReviewDto);
  }

  findAll(pagination: PaginationDto) {
    return this.clientNats.send('findAllReviews', pagination);
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
