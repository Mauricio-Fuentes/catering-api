import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { KafkaModule } from 'src/transports/kafka.module';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, KafkaService],
  imports: [KafkaModule]
})
export class PaymentModule {}
