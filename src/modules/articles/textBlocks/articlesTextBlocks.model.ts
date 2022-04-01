import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Text_blocks } from './textBlocks.model';
import { Articles } from '../articles.model';
@Table
export class Articles_text_blocks extends Model {
  @ForeignKey(() => Articles)
  @Column
  article_id: number;

  @ForeignKey(() => Text_blocks)
  @Column
  text_blocks_id: number;

  @Column
  position_number: number;
}
