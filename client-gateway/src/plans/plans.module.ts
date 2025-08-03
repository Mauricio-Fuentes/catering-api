import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { KafkaModule } from 'src/transports/kafka.module';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  controllers: [PlansController],
  providers: [PlansService, KafkaService],
  imports: [KafkaModule]
})
export class PlansModule {}
