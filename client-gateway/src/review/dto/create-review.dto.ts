import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateReviewDto {

    @IsNumber()
    @ApiProperty({example: 1, description: 'client id'})
    clientId: number;

    @IsNumber()
    @ApiProperty({example: 1, description: '10'})
    weight: number;

    @IsNumber()
    @ApiProperty({example: 1, description: '10'})
    height: number;
}
