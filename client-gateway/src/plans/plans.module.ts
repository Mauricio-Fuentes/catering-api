import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { KafkaModule } from 'src/transports/kafka.module';

@Module({
  controllers: [PlansController],
  providers: [PlansService],
  imports: [KafkaModule]
})
export class PlansModule {}
