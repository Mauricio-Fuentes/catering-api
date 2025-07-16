import { IsNumber, IsPositive } from "class-validator";

export class CreatePlanDto {
    @IsNumber()
    @IsPositive()
    planTypeId: number;

    @IsNumber()
    @IsPositive()
    clientId: number;

}
