import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'
import { ConfigService } from '@nestjs/config';
import { NotFoundExceptionFilter } from './not-found-exception/not-found-exception.filter';

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
  app.useGlobalFilters(new NotFoundExceptionFilter())
  await app.listen(process.env.PORT ?? 3000).then(()=>console.log('App is listening to requests on port 3000'));
}
bootstrap();
