import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
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
    return this.kafkaClient.getClient().send('findOnePlan', id);
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return this.kafkaClient.getClient().send('updatePlan', {
      ...updatePlanDto,
      id,
    });
  }

  remove(id: number) {
    return this.kafkaClient.getClient().send('removePlan', {id});
  }
}
