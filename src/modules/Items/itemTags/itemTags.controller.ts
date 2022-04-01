import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemTagsService } from './itemTags.service';
import { Item_tags } from './itemTags.model';

@Controller('/itemTags')
export class ItemTagsController {
  constructor(private readonly itemTagsService: ItemTagsService) {}

  @Get('/')
  findAll() {
    return this.itemTagsService.findAll();
  }

  @Post('/')
  create(@Body() body: { itemTagName: string }) {
    return this.itemTagsService.create(body.itemTagName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemTagsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { itemTagName: string },
  ): Promise<Item_tags> {
    return this.itemTagsService.update(id, body.itemTagName);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemTagsService.delete(id);
  }
}
