import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./Posts";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({name:'tags'})
export class Tags {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    tagId: string
    
    @Field()
    @Column()
    name:string

    @Field(()=>[Posts])
    @ManyToMany(()=>Posts,(post)=>post.tags)
    Posts: Promise<Posts []>
}