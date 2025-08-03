import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CreatePaymentDto {
    @IsNumber()
    @IsPositive()
    @ApiProperty({example: 1, description: 'ID of the plan'})
    planId: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({example: 1, description: 'Amount to be paid'})
    amount: number;
    
    @IsNumber()
    @IsPositive()
    @ApiProperty({example: 1, description: 'Currency of the payment'})
    currency: number;
    
    @IsNumber()
    @IsPositive()
    @ApiProperty({example: 1, description: 'status of the payment'})
    status: number;
}
