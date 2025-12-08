import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { createUserDto } from './dtos/createUser.dto';
import { updateUserInput } from './dtos/updateUser.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['profile', 'posts'],
    });
  }

  async findOneUser(userId): Promise<User> {
    let user = await this.usersRepository.findOne({ where: { userId } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async createUser({ email, userName }: createUserDto) {
    const foundEmail = await this.usersRepository.findOne({ where: { email } });
    if (foundEmail)
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
    const foundUser = await this.usersRepository.findOne({
      where: { userName },
    });
    if (foundUser)
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    const newUser = await this.usersRepository.create({
      email,
      userName,
      createdAt: new Date(),
    });
    return await this.usersRepository.save(newUser);
  }

  async updateUser(userId: string, { email, userName }: updateUserInput) {
    await this.findOneUser(userId);
    const foundEmail = await this.usersRepository.findOne({ where: { email } });
    if (foundEmail)
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
    const foundUser = await this.usersRepository.findOne({
      where: { userName },
    });
    if (foundUser)
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    const filteredItems = Object.fromEntries(
      Object.entries({ email, userName }).filter(
        (_, value) => value !== undefined,
      ),
    );
    await this.usersRepository.update(userId, filteredItems);
    return await this.findOneUser(userId);
  }
}
