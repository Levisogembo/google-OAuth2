import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Posts } from 'src/typeorm/entities/Posts';
import { PostsService } from './posts.service';
import { createPostInput } from './dtos/createPost.input';
import { use } from 'passport';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ROLES } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/dtos/enums/roles.enum';
import { GqlJwtGuard } from 'src/auth/guards/gql-jwt-guard/gql-jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { currentUser } from 'src/auth/decorators/user.decorator';

@Resolver(()=>Posts)
@UsePipes(new ValidationPipe)
export class PostsResolver {
    constructor(private postService: PostsService){}

    @ROLES(Role.ADMIN,Role.USER)
    @UseGuards(GqlJwtGuard,RolesGuard)
    @Query(()=>[Posts])
    async getPosts(@currentUser() user){
        console.log(user);
       return await this.postService.getAll() 
    }

    @ROLES(Role.ADMIN,Role.USER)
    @UseGuards(GqlJwtGuard,RolesGuard)
    @Mutation(()=>Posts)
    async createPost(@currentUser() user, @Args("postData") info: createPostInput){
        const userId = user.userId
        return await this.postService.createPost(userId,info)
    }
   
}
