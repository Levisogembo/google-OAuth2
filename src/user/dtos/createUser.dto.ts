import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator"
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

    @Field()
    @IsString()
    @MinLength(5)
    password: string

    // @Field(()=>Role)
    // @IsNotEmpty()
    // @IsEnum(Role)
    // role: Role
}