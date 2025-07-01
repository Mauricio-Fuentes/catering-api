import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsString, ValidateNested } from "class-validator";
import { RecipeProductDTO } from "./recipe-product.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRecipeDto {
    @IsString()
    @ApiProperty({example: 1, description: 'description text'})
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => RecipeProductDTO)
    @ApiProperty({type: [RecipeProductDTO], description: 'List of products recipe'})
    products: RecipeProductDTO[];
}
