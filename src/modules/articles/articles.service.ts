import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Articles_text_blocks } from 'src/modules/articles/textBlocks/articlesTextBlocks.model';
import { Text_blocks } from './textBlocks/textBlocks.model';
import { Articles } from './articles.model';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Articles)
    private articlesModel: typeof Articles,
    @InjectModel(Text_blocks)
    private textBlocksModel: typeof Text_blocks,
    @InjectModel(Articles_text_blocks)
    private articlesTextBlocksModel: typeof Articles_text_blocks,
  ) {}

  async findAll(): Promise<Articles[]> {
    return this.articlesModel.findAll();
  }

  async create(itemId: string, articleName: string): Promise<Articles> {
    const article = await this.articlesModel.findOne({
      where: { item_id: itemId, article_name: articleName },
    });
    if (article) return article;
    return this.articlesModel.create({
      item_id: itemId,
      article_name: articleName,
    });
  }

  findOne(id: string): Promise<Articles> {
    return this.articlesModel.findOne({
      where: { id },
      include: [
        {
          model: Text_blocks,
          attributes: ['id', 'text'],
          include: [],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async update(
    id: string,
    itemId: string,
    articleName: string,
  ): Promise<Articles> {
    const [, affectedRows] = await this.articlesModel.update(
      { item_id: itemId, article_name: articleName },
      { where: { id }, returning: true, silent: false, logging: true },
    );

    return affectedRows[0];
  }

  async delete(id: string): Promise<void> {
    const article = await this.findOne(id);
    await article.destroy();
  }

  async addTextBlockToArticle(
    id: string,
    textMass: string,
    positionNumber: string,
  ): Promise<void> {
    let textBlock = await this.textBlocksModel.findOne({
      where: { text: textMass },
    });
    if (textBlock == null) {
      textBlock = await this.textBlocksModel.create(
        { text: textMass },
        { returning: true },
      );
    }
    this.articlesTextBlocksModel.create({
      article_id: id,
      text_block_id: textBlock.id,
      position_number: positionNumber,
    });
  }
}
