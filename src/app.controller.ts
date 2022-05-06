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
import { UserDTO } from './modules/dto/user.dto'
import { ValidationPipe } from './pipes/validation.pipe';
import { DoesUserExist } from './modules/users/auth/doesUserExist.guard';

@Controller('/auth')
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(DoesUserExist)
  @Post("signup")
  async signup(@Body( new ValidationPipe ) user:  UserDTO){
    return await this.authService.create(user);
  }
}
