import { PartialType } from '@nestjs/swagger';
import { CreatePlanTypeDto } from './create-plan-type.dto';

export class UpdatePlanTypeDto extends PartialType(CreatePlanTypeDto) {}
