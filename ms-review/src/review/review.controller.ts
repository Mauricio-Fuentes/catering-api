import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @MessagePattern('createReviewComplete')
  create(@Payload() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @MessagePattern('findAllReviews')
  findAll(@Payload() reviewPaginationDto: PaginationDto) {
    return this.reviewService.findAll(reviewPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
