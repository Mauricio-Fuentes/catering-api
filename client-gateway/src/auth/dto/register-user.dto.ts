import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsPositive, IsString, IsStrongPassword } from 'class-validator';


export class RegisterUserDto {

  @IsString()
  @ApiProperty({ example: 'John123', description: 'username of the user' })
  user:string;

  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  name: string;


  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'email@gmail.com', description: 'User email address' })
  email:string;


  @IsString()
  @IsStrongPassword()
  @ApiProperty({ example: 'StrongPassword123!', description: 'User password' })
  password: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({example: 1, description: 'Role of the user'})
  roleId: number;
}