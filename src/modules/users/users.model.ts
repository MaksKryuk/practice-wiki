import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Users extends Model {
  @Column
  nickname: string;

  @Column
  role: string;

  @Column
  login: string;

  @Column
  password: string;
}
