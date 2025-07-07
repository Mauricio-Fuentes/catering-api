import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreatePlanTypeDto {

    @IsString()
    public description: string;

    @IsNumber()
    public amount: number;

    @IsNumber()
    public discount: number;

    @IsNumber()
    public currency: number;

    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Number)
    public recipes: number[];

}
