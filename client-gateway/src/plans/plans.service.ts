import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { KAFKA_SERVICE } from 'src/config';
import { ClientKafka } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class PlansService {
  private readonly logger = new Logger('PlansService');

  constructor(
    private readonly kafkaClient: KafkaService,
  ) {
    // Initialization logic if needed
  }

  create(createPlanDto: CreatePlanDto) {
    return this.kafkaClient.getClient().send('createPlan', createPlanDto);
  }

  findAll(paginationDto: PaginationDto) {
    return this.kafkaClient.getClient().send('findAllPlans', paginationDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
