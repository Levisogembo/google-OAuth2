import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { User } from "src/typeorm/entities/User";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Serializer extends PassportSerializer{
    constructor(private readonly authService: AuthService){
        super()
    }

    serializeUser(user: User, done: Function) {
        console.log('serialized user',user);
        
        done(null,user)
    }

    async deserializeUser(payload: User, done: Function) {
        const user = await this.authService.findUser(payload.userId)
        console.log('deserialized user',user);
        return user ? done(null,user) : done(null,null)
    }
}