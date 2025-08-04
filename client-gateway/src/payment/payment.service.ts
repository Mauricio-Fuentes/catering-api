import { Injectable, Logger } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaginationDto } from 'src/common';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger('PaymentService');

  constructor(
    private readonly kafkaClient: KafkaService,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.kafkaClient.getClient().send('createPaymentService', createPaymentDto);
  }

  findAll(paginationDto: PaginationDto) {
    return this.kafkaClient.getClient().send('findAllPayments', paginationDto);
  }

  findOne(id: number) {
    return this.kafkaClient.getClient().send('findOnePayment', id);
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.kafkaClient.getClient().send('updatePayment', {
      ...updatePaymentDto,
      id,
    });
  }

  remove(id: number) {
    return this.kafkaClient.getClient().send('removePayment', {id});
  }
}
