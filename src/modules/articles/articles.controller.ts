import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Articles } from './articles.model';
import { ArticleDTO } from '../dto/article.dto';
import { ArticleTextblockDTO } from '../dto/article-textblock.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from '../users/auth/jwt-auth.guard';
import { ArticleOutputDTO } from '../output-dto/article.output.dto';
import { ArticleTextBlocksService } from './textBlocks/articlesTextblocks/articlesTextBlocks.service';
import { TextBlocksService } from './textBlocks/textBlocks.service';

@Controller('/articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly articlesTextblocksService: ArticleTextBlocksService,
    private readonly textblocksService: TextBlocksService
    ) {}

  @Get('/')
  async findAll() {
    return ( await this.articlesService.findAll()).map((article) => new ArticleOutputDTO(article));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body(new ValidationPipe) article: ArticleDTO) {
    const newArticle = await this.articlesService.create(article); 
    return new ArticleOutputDTO(newArticle);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findOne(id);
    return new ArticleOutputDTO(article);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe) article: ArticleDTO,
  ): Promise<ArticleOutputDTO> {
    const updatedArticle = await this.articlesService.update(id, article);
    return new ArticleOutputDTO(updatedArticle);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.articlesService.delete(id);
    const record = await this.articlesTextblocksService.findOne(id);
    console.log("@@@@@@@@", record, id),
    await this.textblocksService.delete(record.text_blocks_id);
    await this.articlesTextblocksService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/addTextBlock')
  async addTextBlockToArticle(
    @Param('id') id: string,
    @Body(new ValidationPipe) textblock: ArticleTextblockDTO,
  ) {
    const newTextblock = await this.articlesService.addTextBlockToArticle(
      id,
      textblock,
    );
    return newTextblock;
  }
}
