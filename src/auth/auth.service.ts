import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { userDetailsDto } from './Dtos/userDetails.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { use } from 'passport';
import { createUserDto } from 'src/user/dtos/createUser.dto';
import { hash, verify } from 'argon2';
import { Role } from 'src/user/dtos/enums/roles.enum';
import { signInInput } from './Dtos/signIn.input';
import { throttleTime } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { authPayload } from './Dtos/authPayload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jtwService: JwtService
  ) {}
  async validateUser(details: userDetailsDto) {
    //console.log(details)
    const foundUser = await this.userRepository.findOne({
      where: { email: details.email },
    });
    if (!foundUser) {
      console.log('User not found, creating a user');
      let user = await this.userRepository.create({
        ...details,
        createdAt: new Date(),
      });
      return await this.userRepository.save(user);
    }
    return foundUser;
  }

  async validateLocalUser({userName,password}:signInInput){
    const user = await this.userRepository.findOneByOrFail({userName})
    const userPassword = user.password
    const isMatch = await verify(userPassword,password)
    if(!isMatch) throw new UnauthorizedException('Invalid credentials')
    return user
  }

  async generateJwtToken(userId:string,role:string){
    const token = await this.jtwService.signAsync({userId,role})
    return {token}
  }

  async login(user: User): Promise<authPayload>{
        const {token} = await this.generateJwtToken(user.userId,user.role)
        return {
            userId: user.userId,
            role: user.role as Role,
            accessToken: token   
        }
  }

  async registerUser({ email, userName, password }: createUserDto) {
    const foundEmail = await this.userRepository.findOne({ where: { email } });
    if (foundEmail)
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
    const foundUser = await this.userRepository.findOne({
      where: { userName },
    });
    if (foundUser)
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    const hashedPassword = await hash(password);
    const newUser = await this.userRepository.create({
      email,
      userName,
      password: hashedPassword,
      role: Role.USER,
      createdAt: new Date(),
    });
    return await this.userRepository.save(newUser);
  }
  
  async findUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async validateToken(userId: string) {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) throw new NotFoundException();
    return {
        userId: user.userId,
        userName: user.userName,
        role: user.role
    };
  }

  async getUsers() {
    return await this.userRepository.find({});
  }
}
