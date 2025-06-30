import { IsNumber, IsPositive } from "class-validator";

export class RecipeProductDTO{
    @IsNumber()
    @IsPositive()
    productId: number;

    @IsNumber()
    @IsPositive()
    quantity: number;
}