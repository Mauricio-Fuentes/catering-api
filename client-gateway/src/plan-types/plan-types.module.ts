import { Module } from '@nestjs/common';
import { PlanTypesService } from './plan-types.service';
import { PlanTypesController } from './plan-types.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [PlanTypesController],
  providers: [PlanTypesService],
  imports: [NatsModule]
})
export class PlanTypesModule {}
