import {
  Column,
  Model,
  Table,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Articles } from '../articles/articles.model';
import { Items_item_tag } from './itemsItemTags.model';
import { Items_Recipes } from './itemsRecipes.model';
import { Item_tags } from './itemTags.model';
import { Recipes } from '../Recipes/recipes.model';

@Table
export class Item extends Model {
  @Column
  item_name: string;

  @HasMany(() => Articles)
  article: Articles[];

  @BelongsToMany(() => Recipes, () => Items_Recipes)
  recipes: Recipes[];

  @BelongsToMany(() => Item_tags, () => Items_item_tag)
  tags: Item_tags[];
}
