/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemTagsService } from './itemTags.service';
import { Item_tags } from 'src/modules/Items/itemTags.model';

@Controller('/items')
export class ItemTagsController {
  constructor(
    private readonly itemTagsService: ItemTagsService,
  ) {}

  @Get('/itemTags/')
  findAll(){
    return this.itemTagsService.findAll();
  }

  @Post('/itemTags/')
  create(@Body() body: { itemTagName: string }) {
    return this.itemTagsService.create(body.itemTagName);
  }

  @Get('/itemTags:id')
  findOne(@Param('id') id: string){
    return this.itemTagsService.findOne(id);
  }

  @Put('/itemTags:id')
  update(@Param('id') id: string, @Body() body:{ itemTagName: string } ): Promise<Item_tags> {
    return this.itemTagsService.update(id, body.itemTagName);
  }

  @Delete('/itemTags:id')
  delete(@Param('id') id: string) {
    return this.itemTagsService.delete(id);
  }

}
