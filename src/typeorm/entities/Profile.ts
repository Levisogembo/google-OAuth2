import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({name:'profile'})
export class Profile {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    profileId: string

    @Field()
    @Column()
    bio: string

    @Field()
    @Column()
    avatar: string

    @Field(()=>User)
    @OneToOne(()=>User,(user)=>user.profile)
    @JoinColumn()
    user: Promise<User>   
}