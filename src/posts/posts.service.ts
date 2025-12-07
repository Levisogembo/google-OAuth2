import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/typeorm/entities/Posts';
import { Repository } from 'typeorm';
import { createPostInput } from './dtos/createPost.input';
import { User } from 'src/typeorm/entities/User';
import { Tags } from 'src/typeorm/entities/Tags';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Posts) private postsRepository: Repository<Posts>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Tags) private tagsRepository: Repository<Tags>){}
    
    async getAll(){
        return await this.postsRepository.find()
    }

    async createPost(userId,info:createPostInput){
       const foundUser = await this.usersRepository.findOne({where:{userId}})
       let tag:any
       if(info.tags){
            tag = await this.tagsRepository.findOne({where:{tagId:info.tags}})
       }
       if(!foundUser) throw new NotFoundException()
       const newPost = this.postsRepository.create({
        title: info.title,
        tags: tag ? [tag] as any : undefined,
        content: info.content,
        user: foundUser as any
       })
       return await this.postsRepository.save(newPost)
    }
}
