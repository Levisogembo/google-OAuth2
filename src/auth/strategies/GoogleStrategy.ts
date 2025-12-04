import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOptions } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private authService: AuthService) {
    super({
      clientID: configService.get<string>('ClientID') || 'client',
      clientSecret: configService.get<string>('ClientSecret') ?? '',
      callbackURL: 'http://localhost:3001/api/v1/auth/google/redirect',
      scope: ['profile','email'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email =  profile._json.email as string
    const displayName = profile.displayName
    const user =  await this.authService.validateUser({email,displayName})
    return user || null
  }
}
