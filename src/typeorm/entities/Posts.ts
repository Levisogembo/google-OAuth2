import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Tags } from "./Tags";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({name:'posts'})
export class Posts {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    postId: string

    @Field()
    @Column()
    title: string

    @Field()
    @Column()
    content: string

    @Field(()=>User)
    @ManyToOne(()=>User,(user)=>user.posts)
    @JoinColumn()
    user: Promise<User>

    @Field(()=>[Tags])
    @ManyToMany(()=>Tags,(tag)=>tag.Posts)
    @JoinColumn()
    tags?: Promise<Tags[]> 
}