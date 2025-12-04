import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/GoogleAuthGuard';
import { AuthService } from './auth.service';

@Controller('auth')
@UseGuards(GoogleAuthGuard)
export class AuthController {
  constructor(private readonly authService:AuthService){}

  @Get('google/login')
  async handeLogin() {
    return { msg: 'Google auth complete' };
  }

  @Get('google/redirect')
  handleRedirect() {
    return { msg: 'Ok' };
  }

  @Get('user')
  async getUsers(){
    let users = await this.authService.getUsers()
    return users.length ? {msg:'found users',data:users} : {msg:'No users at the moment'}
  }
}
