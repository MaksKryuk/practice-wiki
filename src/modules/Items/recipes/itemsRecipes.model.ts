import { Model, Table, ForeignKey, Column } from 'sequelize-typescript';
import { Item } from '../items.model';
import { Recipes } from './recipes.model';
@Table
export class Items_Recipes extends Model {
  @ForeignKey(() => Item)
  @Column
  item_id: number;

  @ForeignKey(() => Recipes)
  @Column
  recipe_id: number;
}
