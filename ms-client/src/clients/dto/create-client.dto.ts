import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateClientDto {
    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsDate()
    @Type(() => Date)
    dateBirth: Date;

    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsString()
    address: string;

}
