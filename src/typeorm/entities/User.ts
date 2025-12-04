import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column({unique:true})
    email: string

    @Column()
    displayName: string

    @Column()
    createdAt: Date
}