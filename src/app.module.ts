import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {ConfigModule, ConfigService} from '@nestjs/config'
import {TypeOrmModule } from '@nestjs/typeorm'
import { User } from './typeorm/entities/User';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, PassportModule.register({session:true})],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        port: configService.get<number>("DB_PORT"),
        host: configService.get<string>("DB_HOST"),
        database: configService.get<string>("DB_NAME"),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASSWORD"),
        entities: [User],
        synchronize: true
      })
    })
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
