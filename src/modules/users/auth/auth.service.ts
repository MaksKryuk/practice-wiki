import { Body, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(lgn: string, pass: string): Promise<any>  {
    const user = await this.usersService.findOne(lgn);
    if (!user) {
      return null;
    }
    
    const match = await this.comparePassword(pass, user.password);    
    if(!match){
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {    
    const payload = { login: user.dataValues.login, sub: user.dataValues.id };
    const token = await this.generateToken(payload);
    return {
      token,
    };
  }

  async create(user: any){

    const pass = await this.hashPassword(user.password); 

    const newUser = await this.usersService.create(user.role, user.login, pass);

    const {password, ...result} = newUser['dataValues'];

    const token = await this.generateToken(result);
    
    return{user: result, token};
  }

  async generateToken(user: any){
    const token = await this.jwtService.sign(user);
    return token;
  }

  async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async comparePassword(enteredPassword, dbPassword){
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
