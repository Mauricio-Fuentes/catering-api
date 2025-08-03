import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ClientKafka } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { KAFKA_SERVICE } from 'src/config';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger('PaymentService');

  constructor(
    private readonly kafkaClient: KafkaService,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    try {
      return this.kafkaClient.getClient().send('createPayment', createPaymentDto);  
    } catch (error) {
      console.log('Hola' + error);
    }
    
  }

  findAll(paginationDto: PaginationDto) {
    return this.kafkaClient.getClient().send('findAllPayments', paginationDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
