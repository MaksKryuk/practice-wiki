import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item_tags } from './itemTags.model';
import { Item } from '../items.model';
import { Items_item_tag } from 'src/modules/Items/itemTags/itemsItemTags.model';

@Injectable()
export class ItemTagsService {
  constructor(
    @InjectModel(Item_tags)
    private itemTagsModel: typeof Item_tags,
  ) {}

  async findAll(): Promise<Item_tags[]> {
    return this.itemTagsModel.findAll();
  }

  async create(itemTagName: string): Promise<Item_tags> {
    const tag = await this.itemTagsModel.findOne({
      where: { tag_name: itemTagName },
    });
    if (tag) return tag;
    return this.itemTagsModel.create({ tag_name: itemTagName });
  }

  findOne(id: string): Promise<Item_tags> {
    return this.itemTagsModel.findOne({ where: { id } });
  }

  async update(id: string, itemTagName: string): Promise<Item_tags> {
    const [, affectedRows] = await this.itemTagsModel.update(
      { tag_name: itemTagName },
      { where: { id }, returning: true, silent: false, logging: true },
    );

    return affectedRows[0];
  }

  async delete(id: string): Promise<void> {
    const item = await this.findOne(id);
    await item.destroy();
  }
}
