import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/typeorm/entities/User';
import { UserService } from './user.service';
import { createUserDto } from './dtos/createUser.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { updateUserInput } from './dtos/updateUser.input';

@Resolver(()=>User)
export class UserResolver {
    constructor(private usersService: UserService){}

    @Query(()=>[User],{name:'getUsers'})
    async getUser(){
        return await this.usersService.findAll()
    }

    @Query(()=>User)
    async getUserById(@Args('id') userId: string){
        return await this.usersService.findOneUser(userId)
    }

    //lazy-loading the fields for nested object found in entity relations
    @ResolveField("profile")
    async profile(@Parent() user: User){
        return await user.profile
    }


    @Mutation(()=>User)
    @UsePipes(new ValidationPipe)
    async createUser(@Args('userData') userData: createUserDto){
        const createdUser = await this.usersService.createUser(userData)
        return createdUser
    }

    @Mutation(()=>User)
    async updateUser(@Args('id',{type:()=>String}) userId:string,@Args("updatedInput") updateData: updateUserInput){
        return await this.usersService.updateUser(userId,updateData)
    }
}
