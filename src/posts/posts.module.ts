import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/typeorm/entities/Posts';
import { User } from 'src/typeorm/entities/User';
import { Tags } from 'src/typeorm/entities/Tags';

@Module({
  imports: [TypeOrmModule.forFeature([Posts,User,Tags])],
  providers: [PostsService, PostsResolver]
})
export class PostsModule {}
