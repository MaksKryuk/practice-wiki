import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Articles } from '../articles/articles.model';
import { Articles_text_blocks } from '../../models/articlesTextBlocks.model';

@Table
export class Text_blocks extends Model {
  @Column
  text: string;

  @BelongsToMany(() => Articles, () => Articles_text_blocks)
  articles: Articles[];
}
