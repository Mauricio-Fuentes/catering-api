import { Module } from '@nestjs/common';
import { PlanTypeService } from './plan-type.service';
import { PlanTypeController } from './plan-type.controller';
import { NatsModule } from 'src/transport/nats.module';

@Module({
  controllers: [PlanTypeController],
  providers: [PlanTypeService]
})
export class PlanTypeModule {}
