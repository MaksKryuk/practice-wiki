import { Model, Table, BelongsToMany, Column } from 'sequelize-typescript';
import { Item } from './items.model';
import { Items_Recipes } from './itemsRecipes.model';

@Table
export class Recipes extends Model {
  @Column
  where_made: string;

  @Column
  recipe_name: string;

  @Column
  materials: string;

  @BelongsToMany(() => Item, () => Items_Recipes)
  item: Item[];
}
