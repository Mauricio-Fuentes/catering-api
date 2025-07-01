import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class RecipeProductDTO{
    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 1, description: 'The ID of the product' })
    productId: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 1, description: 'quantity products' })
    quantity: number;
}