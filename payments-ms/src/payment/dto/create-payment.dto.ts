import { IsNumber } from "class-validator";

export class CreatePaymentDto {
    @IsNumber()
    planId: number;

    @IsNumber()
    amount: number;

    @IsNumber()
    currency: number;

    @IsNumber()
    status:number;
}
