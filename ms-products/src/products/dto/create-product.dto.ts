import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    public name: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    public quantity: number;

    @IsNumber({maxDecimalPlaces: 4})
    @IsPositive()
    @Min(0)
    @Type(() => Number)
    public measure: number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    public registeruserid: number;

}
