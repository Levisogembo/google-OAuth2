import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class signInInput{
    @Field()
    @IsNotEmpty()
    @IsString()
    userName: string

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    password: string

}