import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersModel.findAll();
  }

  async create(
    userRole: string,
    userLogin: string,
    userPassword: string,
  ): Promise<Users> {
    const user = await this.usersModel.findOne({
      where: {
        role: userRole,
        login: userLogin,
        password: userPassword,
      },
    });
    if (user) return user;

    return this.usersModel.create({
      role: userRole,
      login: userLogin,
      password: userPassword,
    });
  }

  findOne(lgn: string): Promise<Users | undefined> {
    return this.usersModel.findOne({ where: { login: lgn } });
  }

  async update(
    id: string,
    userRole: string,
    lgn: string,
    pass: string,
  ): Promise<Users> {
    const [, affectedRows] = await this.usersModel.update(
      { role: userRole, login: lgn, password: pass },
      { where: { id }, returning: true, silent: false, logging: true },
    );

    return affectedRows[0];
  }

  async delete(lgn: string): Promise<void> {
    const user = await this.findOne(lgn);
    await user.destroy();
  }
}
