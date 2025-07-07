import { IsNumber } from "class-validator";

export class CreateReviewDto {
    @IsNumber()
    clientId: number;

    @IsNumber()
    weight: number;

    @IsNumber()
    height: number;
}
