import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './modules/users/auth/local-auth.guard';
import { AuthService } from './modules/users/auth/auth.service';
import { JwtAuthGuard } from './modules/users/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/auth')
  async validateUser(@Body() body: { lgn: string; pass: string }) {
    return this.authService.validateUser(body.lgn, body.pass);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
