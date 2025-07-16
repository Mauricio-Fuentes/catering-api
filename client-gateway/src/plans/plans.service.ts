import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { KAFKA_SERVICE } from 'src/config';
import { ClientKafka } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Injectable()
export class PlansService {
  private readonly logger = new Logger('PlansService');

  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka
  ) {
    // Initialization logic if needed
  }

  async onModuleInit() {
    this.logger.log('Connecting to Kafka...');
    this.kafkaClient.subscribeToResponseOf('createPlan');
    await this.kafkaClient.connect();
    this.logger.log('Kafka client connected');
  }

  create(createPlanDto: CreatePlanDto) {
    return this.kafkaClient.send('createPlan', createPlanDto);
  }

  findAll(paginationDto: PaginationDto) {
    return this.kafkaClient.send('findAllPlans', paginationDto);
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
