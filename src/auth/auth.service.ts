import { Injectable, NotFoundException } from '@nestjs/common';
import { userDetailsDto } from './Dtos/userDetails.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { use } from 'passport';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}
    async validateUser(details: userDetailsDto){
        //console.log(details)
        const foundUser = await this.userRepository.findOne({where:{email:details.email}})
        if(!foundUser){
            console.log('User not found, creating a user')
           let user = await this.userRepository.create({
                ...details,createdAt: new Date()
            })
            return await this.userRepository.save(user)
        } 
        return foundUser
    }
    
    async findUser(userId:string){
        const user = await this.userRepository.findOne({where:{userId}})
        if(!user) throw new NotFoundException()
        return user
    }

    async getUsers(){
        return await this.userRepository.find({})
    }
}
