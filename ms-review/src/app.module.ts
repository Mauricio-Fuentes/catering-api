import { Module } from '@nestjs/common';
import { NatsModule } from './transport/nats.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
