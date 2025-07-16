import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CreatePlanDto {
    @IsNumber()
    @IsPositive()
    @ApiProperty({example: 1, description: 'ID of the plan type'})
    planTypeId: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({example: 1, description: 'ID of the client'})
    clientId: number;
}
