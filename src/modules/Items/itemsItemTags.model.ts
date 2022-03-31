import { Model, Table, ForeignKey, Column } from 'sequelize-typescript';
import { Item } from './items.model';
import { Item_tags } from './itemTags.model';
@Table
export class Items_item_tag extends Model {
  @ForeignKey(() => Item)
  @Column
  item_id: number;

  @ForeignKey(() => Item_tags)
  @Column
  item_tag_id: number;
}
