import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { NatsModule } from 'src/transport/nats.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [NatsModule],
})
export class ReviewModule {}
