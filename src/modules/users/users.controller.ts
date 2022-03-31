import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Users } from './users.model';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/')
  create(
    @Body() body: { nick: string; userRole: string; lgn: string; pass: string },
  ) {
    return this.usersService.create(
      body.nick,
      body.userRole,
      body.lgn,
      body.pass,
    );
  }

  @Get(':nickname')
  findOne(@Param('nickname') lgn: string) {
    return this.usersService.findOne(lgn);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { nick: string; userRole: string; lgn: string; pass: string },
  ): Promise<Users> {
    return this.usersService.update(
      id,
      body.nick,
      body.userRole,
      body.lgn,
      body.pass,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
