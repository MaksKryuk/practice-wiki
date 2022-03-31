import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  getHello(): string {
    return 'Hello Worlp!';
  }

  async findAll(): Promise<Users[]> {
    return this.usersModel.findAll();
  }

  async create(
    nick: string,
    userRole: string,
    lgn: string,
    pass: string,
  ): Promise<Users> {
    const user = await this.usersModel.findOne({
      where: {
        nickname: nick,
        role: userRole,
        login: lgn,
        password: pass,
      },
    });
    if (user) return user;

    return this.usersModel.create({
      nickname: nick,
      role: userRole,
      login: lgn,
      password: pass,
    });
  }

  findOne(lgn: string): Promise<Users | undefined> {
    return this.usersModel.findOne({ where: { login: lgn } });
  }

  async update(
    id: string,
    nick: string,
    userRole: string,
    lgn: string,
    pass: string,
  ): Promise<Users> {
    const [, affectedRows] = await this.usersModel.update(
      { nickname: nick, role: userRole, login: lgn, password: pass },
      { where: { id }, returning: true, silent: false, logging: true },
    );

    return affectedRows[0];
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
