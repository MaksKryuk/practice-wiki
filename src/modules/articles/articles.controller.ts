import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Articles } from './articles.model';

@Controller('/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('/')
  findAll() {
    return this.articlesService.findAll();
  }

  @Post('/')
  create(@Body() body: { itemId: string; articleName: string }) {
    return this.articlesService.create(body.itemId, body.articleName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { itemId: string; articleName: string },
  ): Promise<Articles> {
    return this.articlesService.update(id, body.itemId, body.articleName);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.articlesService.delete(id);
  }

  @Post(':id/addTexBlock')
  addTextBlockToArticle(
    @Param('id') id: string,
    @Body() body: { txt: string; positionNumber: string },
  ) {
    return this.articlesService.addTextBlockToArticle(
      id,
      body.txt,
      body.positionNumber,
    );
  }
}
