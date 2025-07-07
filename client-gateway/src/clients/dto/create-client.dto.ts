import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateClientDto {
        @IsString()
        @ApiProperty({
            description: 'The name of the client',
            example: 'John',
        })
        name: string;
    
        @IsString()
        @ApiProperty({
            description: 'The last name of the client',
            example: 'Doe',
        })  
        lastName: string;
    
        @IsDate()
        @Type(() => Date)
        @ApiProperty({
            description: 'The birth date of the client',
            example: '1990-01-01T00:00:00.000Z',
        })
        dateBirth: Date;
    
        @IsString()
        @ApiProperty({
            description: 'The phone number of the client',
            example: '+1234567890',
        })  
        phone: string;
    
        @ApiProperty({
            description: 'The email address of the client',
            example: 'correo@gmail.com'
        })
        @IsString()
        email: string;
    
        @IsString()
        @ApiProperty({
            description: 'The address of the client',
            example: '123 Main St, Springfield, USA',
        })
        address: string;
}
