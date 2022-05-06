import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Articles_text_blocks } from './articlesTextBlocks.model';

@Injectable()
export class ArticleTextBlocksService {
  constructor(
    @InjectModel(Articles_text_blocks)
    private articleTextBlocksModel: typeof Articles_text_blocks,
  ) {}

  findOne(id: string): Promise<Articles_text_blocks>{
    return this.articleTextBlocksModel.findOne({
        where:{ article_id: id}
    });
  }

  findAll(): Promise<Articles_text_blocks[]>{
      return this.articleTextBlocksModel.findAll();
  }

  async delete(id: string): Promise<void>{
      const record = await this.findOne(id);
      await record.destroy();
  }
}