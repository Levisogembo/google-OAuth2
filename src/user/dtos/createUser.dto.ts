import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Role } from "./enums/roles.enum"

@InputType()
export class createUserDto{
    @IsNotEmpty()
    @Field()
    @IsString()
    userName: string

    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Field(()=>Role)
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role
}