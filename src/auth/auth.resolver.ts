import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/typeorm/entities/User';
import { createUserDto } from 'src/user/dtos/createUser.dto';
import { AuthService } from './auth.service';
import { authPayload } from 'src/auth/Dtos/authPayload';
import { signInInput } from './Dtos/signIn.input';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Mutation(()=>User)
    async signUp(@Args('input') input:createUserDto){
        return await this.authService.registerUser(input)
    }

    @Mutation(()=>authPayload)
    async signIn(@Args("loginData") {userName,password}:signInInput){
        const user = await this.authService.validateLocalUser({userName,password})
        return await this.authService.login(user)
    }


}
