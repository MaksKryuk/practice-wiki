import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserDTO } from '../dto/user.dto';
import { UserOutputDTO } from '../output-dto/user.output.dto';
import { Users } from './users.model';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async findAll() {
    return (await this.usersService.findAll()).map((user) => new UserOutputDTO(user));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(
    @Body(new ValidationPipe) user: UserDTO,
  ) {
    const newUser = await this.usersService.create(
      user.role, 
      user.login, 
      user.password,
    )
    return new UserOutputDTO(newUser);
  }

  @Get(':nickname')
  async findOne(@Param('nickname') lgn: string): Promise<UserOutputDTO> {
    const user = await this.usersService.findOne(lgn);
    return new UserOutputDTO(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe) body: { userRole: string; lgn: string; pass: string },
  ): Promise<UserOutputDTO> {
   const user = await this.usersService.update(
      id,
      body.userRole,
      body.lgn,
      body.pass,
    );
    return new UserOutputDTO(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':login')
  delete(@Param('login') login: string) {
    return this.usersService.delete(login);
  }
}
