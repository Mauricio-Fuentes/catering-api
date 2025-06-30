import { ArrayMinSize, IsArray, IsString, ValidateNested } from "class-validator";
import { RecipeProductDTO } from "./recipe-product.dto";
import { Type } from "class-transformer";

export class CreateRecipeDto {

    @IsString()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => RecipeProductDTO)
    products: RecipeProductDTO[];
}
