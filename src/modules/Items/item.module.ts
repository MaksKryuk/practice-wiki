import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './items.model';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item_tags } from 'src/modules/Items/itemTags.model';
import { Items_item_tag } from 'src/modules/Items/itemsItemTags.model';
import { Recipes } from '../Recipes/recipes.model';
import { Items_Recipes } from './itemsRecipes.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Item,
      Item_tags,
      Items_item_tag,
      Recipes,
      Items_Recipes,
    ]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
