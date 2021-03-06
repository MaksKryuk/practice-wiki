import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Articles_text_blocks } from 'src/modules/articles/textBlocks/articlesTextblocks/articlesTextBlocks.model';
import { TextBlocksController } from './textBlocks/textBlocks.controller';
import { Text_blocks } from './textBlocks/textBlocks.model';
import { TextBlocksService } from './textBlocks/textBlocks.service';
import { ArticlesController } from './articles.controller';
import { Articles } from './articles.model';
import { ArticlesService } from './articles.service';
import { ArticleTextBlocksService } from './textBlocks/articlesTextblocks/articlesTextBlocks.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Articles, Text_blocks, Articles_text_blocks]),
  ],
  controllers: [ArticlesController, TextBlocksController],
  providers: [ArticlesService, TextBlocksService, ArticleTextBlocksService],
})
export class ArticlesModule {}
