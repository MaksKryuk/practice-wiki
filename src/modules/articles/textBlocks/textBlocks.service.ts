import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Text_blocks } from './textBlocks.model';

@Injectable()
export class TextBlocksService {
  constructor(
    @InjectModel(Text_blocks)
    private textBlocksModel: typeof Text_blocks,
  ) {}

  async findAll(): Promise<Text_blocks[]> {
    return this.textBlocksModel.findAll();
  }

  async create(newTextblock: any): Promise<Text_blocks> {
    const textBlock = await this.textBlocksModel.findOne({
      where: { text: newTextblock.text },
    });
    if (textBlock) return textBlock;
    return this.textBlocksModel.create({ text: newTextblock.text});
  }

  findOne(id: string): Promise<Text_blocks> {
    return this.textBlocksModel.findOne({
      where: { id },
    });
  }

  async update(id: string, textblock: any): Promise<Text_blocks> {
    const [, affectedRows] = await this.textBlocksModel.update(
      { text: textblock.text },
      { where: { id }, returning: true, silent: false, logging: true },
    );

    return affectedRows[0];
  }

  async delete(id: string): Promise<void> {
    const textBlock = await this.findOne(id);
    await textBlock.destroy();
  }
}
