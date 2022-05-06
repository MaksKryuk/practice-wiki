import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Articles_text_blocks } from 'src/modules/articles/textBlocks/articlesTextblocks/articlesTextBlocks.model';
import { Text_blocks } from './textBlocks/textBlocks.model';
import { Articles } from './articles.model';
import { ArticleTextBlocksService } from './textBlocks/articlesTextblocks/articlesTextBlocks.service';
import { TextBlocksService } from './textBlocks/textBlocks.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Articles)
    private articlesModel: typeof Articles,
    @InjectModel(Text_blocks)
    private textBlocksModel: typeof Text_blocks,
    @InjectModel(Articles_text_blocks)
    private articlesTextBlocksModel: typeof Articles_text_blocks,
    private readonly articleTextblocks: ArticleTextBlocksService,
    private readonly textBlocksService: TextBlocksService,
  ) {}

  async findAll(): Promise<Articles[]> {
    return this.articlesModel.findAll();
  }

  async create(newArticle: any): Promise<Articles> {
    const article = await this.articlesModel.findOne({
      where: { item_id: newArticle.item_id, article_name: newArticle.article_name },
    });
    if (article) return article;
    return this.articlesModel.create({
      item_id: newArticle.item_id,
      article_name: newArticle.article_name,
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
    newArticle: any,
  ): Promise<Articles> {
    const [, affectedRows] = await this.articlesModel.update(
      { item_id: newArticle.item_id, article_name: newArticle.article_name },
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
    newTextblock: any,
  ): Promise<void> {
    let textBlock = await this.textBlocksModel.findOne({
      where: { text: newTextblock.text },
    });
    if (textBlock == null) {
      textBlock = await this.textBlocksModel.create(
        { text: newTextblock.text },
        { returning: true },
      );
    }
    this.articlesTextBlocksModel.create({
      article_id: id,
      text_blocks_id: textBlock.id,
      position_number: newTextblock.position_number,
    });
  }
}
