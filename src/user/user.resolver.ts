import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/typeorm/entities/User';
import { UserService } from './user.service';
import { createUserDto } from './dtos/createUser.dto';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { updateUserInput } from './dtos/updateUser.input';
import { GqlJwtGuard } from 'src/auth/guards/gql-jwt-guard/gql-jwt-guard';
import { log } from 'node:console';
import { currentUser } from 'src/auth/decorators/user.decorator';
import { Role } from './dtos/enums/roles.enum';
import { ROLES } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Resolver(()=>User)
export class UserResolver {
    constructor(private usersService: UserService){}

    @ROLES(Role.USER,Role.ADMIN)
    @UseGuards(GqlJwtGuard,RolesGuard)
    @Query(()=>[User],{name:'getUsers'})
    async getUser(@currentUser() user){ 
        console.log(user);
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
