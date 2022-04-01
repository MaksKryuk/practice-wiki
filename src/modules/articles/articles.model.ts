import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Articles_text_blocks } from './textBlocks/articlesTextBlocks.model';
import { Item } from '../Items/items.model';
import { Text_blocks } from './textBlocks/textBlocks.model';

@Table
export class Articles extends Model {
  @ForeignKey(() => Item)
  @Column
  item_id: number;

  @BelongsToMany(() => Text_blocks, () => Articles_text_blocks)
  text_blocks: Text_blocks[];

  @Column
  article_name: string;

  @BelongsTo(() => Item)
  item: Item;
}
