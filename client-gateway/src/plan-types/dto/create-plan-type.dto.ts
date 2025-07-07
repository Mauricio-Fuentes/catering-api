import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreatePlanTypeDto {
  @IsString()
  @ApiProperty({ example: 'description', description: 'description text' })
  public description: string;

  @IsNumber()
  @ApiProperty({ example: 123, description: 'amount' })
  public amount: number;

  @IsNumber()
  @ApiProperty({ example: 123, description: 'discount' })
  public discount: number;

  @IsNumber()
  @ApiProperty({ example: 123, description: 'currency' })
  public currency: number;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  @ApiProperty({description: 'List of products plan type'})
  public recipes: number[];
}
