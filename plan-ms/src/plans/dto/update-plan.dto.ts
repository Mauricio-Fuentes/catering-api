import { PartialType } from '@nestjs/swagger';
import { CreatePlanDto } from './create-plan.dto';
import { IsNumber } from 'class-validator';

export class UpdatePlanDto extends PartialType(CreatePlanDto) {
    @IsNumber()
    id: number
}
