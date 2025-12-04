import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  const configService = app.get(ConfigService)
  app.use(session({
    secret: configService.get<string>("Session_Secret") ?? '',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
