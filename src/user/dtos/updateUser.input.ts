import { InputType, PartialType } from "@nestjs/graphql";
import { createUserDto } from "./createUser.dto";

@InputType()
export class updateUserInput extends PartialType(createUserDto){}