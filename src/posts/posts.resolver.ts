import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Posts } from 'src/typeorm/entities/Posts';
import { PostsService } from './posts.service';
import { createPostInput } from './dtos/createPost.input';
import { use } from 'passport';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(()=>Posts)
@UsePipes(new ValidationPipe)
export class PostsResolver {
    constructor(private postService: PostsService){}

    @Query(()=>[Posts])
    async getPosts(){
       return await this.postService.getAll() 
    }

    @Mutation(()=>Posts)
    async createPost(@Args("userId",{type:()=>String}) userId: string, @Args("postData") info: createPostInput){
        return await this.postService.createPost(userId,info)
    }
   
}
