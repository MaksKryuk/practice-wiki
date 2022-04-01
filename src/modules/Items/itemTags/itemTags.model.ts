import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Item } from '../items.model';
import { Items_item_tag } from './itemsItemTags.model';

@Table
export class Item_tags extends Model {
  @Column
  tag_name: string;

  @BelongsToMany(() => Item, () => Items_item_tag)
  item: Item[];
}
