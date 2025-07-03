import { IsNumber, IsString } from "class-validator";

export class CreatePlanTypeDto {

    @IsString()
    public description: string;

    @IsNumber()
    public amount: number;

    @IsNumber()
    public discount: number;

    @IsNumber()
    public currency: number;

}
