import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Articles } from './articles.model';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Articles)
    private articlesModel: typeof Articles,
  ) {}

  getHello(): string {
    return 'Hello Worlp!';
  }

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
    return this.articlesModel.findOne({ where: { id } });
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
}
