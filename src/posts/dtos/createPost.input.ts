import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class createPostInput{
    @Field()
    @IsNotEmpty()
    @IsString()
    title:string
    
    @Field()
    @IsNotEmpty()
    @IsString()
    content:string

    @Field()
    @IsOptional()
    @IsString()
    tags?: string
}