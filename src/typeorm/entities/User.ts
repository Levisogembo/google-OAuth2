import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";
import { Posts } from "./Posts";
import { Field, ObjectType } from "@nestjs/graphql";
import { Role } from "src/user/dtos/enums/roles.enum";

@ObjectType()
@Entity({name:'users'})
export class User {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Field()
    @Column({unique:true})
    email: string

    @Field()
    @Column({unique:true})
    userName: string

    @Field()
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: string

    @Field(()=> Profile)
    @OneToOne(()=>Profile,(profile)=>profile.user)
    profile: Promise<Profile>

    @Field(()=>[Posts])
    @OneToMany(()=>Posts,(posts)=>posts.user)
    posts: Promise<Posts[]>

    @Field()
    @Column()
    createdAt: Date
}