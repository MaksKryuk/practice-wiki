import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './items.model';
import { Item_tags } from './itemTags/itemTags.model';
import { Items_item_tag } from './itemTags/itemsItemTags.model';
import { Recipes } from './recipes.model';
import { Items_Recipes } from 'src/modules/Items/itemsRecipes.model';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
    @InjectModel(Item_tags)
    private itemTagsModel: typeof Item_tags,
    @InjectModel(Items_item_tag)
    private itemTagsItemModel: typeof Items_item_tag,
    @InjectModel(Recipes)
    private recipesModel: typeof Recipes,
    @InjectModel(Items_Recipes)
    private itemRecipesModel: typeof Items_Recipes,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemModel.findAll();
  }

  async create(itemName: string): Promise<Item> {
    const item = await this.itemModel.findOne({
      where: { item_name: itemName },
    });
    if (item) return item;
    return this.itemModel.create({ item_name: itemName });
  }

  findOne(id: string): Promise<Item> {
    return this.itemModel.findOne({
      where: { id },

      include: [
        {
          model: Item_tags,
          attributes: ['id', 'tag_name'],
          include: [],
          through: {
            attributes: [],
          },
        },
        {
          model: Recipes,
          attributes: ['id', 'where_made', 'recipe_name', 'materials'],
          include: [],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async update(id: string, itemName: string): Promise<Item> {
    const [, affectedRows] = await this.itemModel.update(
      { item_name: itemName },
      { where: { id }, returning: true },
    );

    return affectedRows[0];
  }

  async delete(id: string): Promise<void> {
    const item = await this.findOne(id);
    await item.destroy();
  }

  async addTagToItem(id: string, tagName: string): Promise<void> {
    let tag = await this.itemTagsModel.findOne({
      where: { tag_name: tagName },
    });
    if (tag == null) {
      tag = await this.itemTagsModel.create(
        { tag_name: tagName },
        { returning: true },
      );
    }
    this.itemTagsItemModel.create({ item_tag_id: tag.id, item_id: id });
  }

  async addRecipeToItem(
    id: string,
    whereMade: string,
    recipeName: string,
    mats: string,
  ): Promise<void> {
    let recipe = await this.recipesModel.findOne({
      where: { recipe_name: recipeName },
    });
    if (recipe == null) {
      recipe = await this.recipesModel.create(
        { where_made: whereMade, recipe_name: recipeName, materials: mats },
        { returning: true },
      );
    }
    this.itemRecipesModel.create({ item_id: id, recipe_id: recipe.id });
  }
}
