import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Users extends Model {
  @Column
  role: string;

  @Column
  login: string;

  @Column
  password: string;
}
