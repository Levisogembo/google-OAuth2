import { Field, ObjectType } from "@nestjs/graphql"
import { Role } from "../../user/dtos/enums/roles.enum"

@ObjectType()
export class authPayload{
    @Field()
    userId: string

    @Field(()=>Role)
    role: Role

    @Field()
    accessToken: string
}