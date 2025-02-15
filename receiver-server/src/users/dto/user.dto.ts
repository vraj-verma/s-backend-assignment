
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserDTO {

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    class: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsOptional()
    insertedAt: Date | string;
}