import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class userDetailsDto{
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    displayName: string
}