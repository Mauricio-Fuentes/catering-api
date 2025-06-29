import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  public name: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 'Product quantity',
    description: 'The quantity of product',
  })
  public quantity: number;

  @IsNumber({ maxDecimalPlaces: 4 })
  @IsPositive()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({
    example: 'Product measure',
    description: "1"
  })
  public measure: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
    @ApiProperty({
    example: 'Product measure',
    description: "1"
  })
  public registeruserid: number;
}
