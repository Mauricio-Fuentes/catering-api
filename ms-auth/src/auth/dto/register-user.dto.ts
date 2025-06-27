import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';


export class RegisterUserDto {

  @IsString()
  user: string;

  @IsString()
  @IsEmail()
  email:string;

  @IsString()
  name: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNumber()
  roleId: number;
}