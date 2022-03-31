import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './items.model';

@Controller('/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  findAll() {
    return this.itemService.findAll();
  }

  @Post('/')
  create(@Body() body: { itemName: string }) {
    return this.itemService.create(body.itemName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { itemName: string },
  ): Promise<Item> {
    return this.itemService.update(id, body.itemName);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemService.delete(id);
  }

  @Post(':id/addTag')
  addTag(@Param('id') id: string, @Body() body: { tagName: string }) {
    return this.itemService.addTagToItem(id, body.tagName);
  }

  @Post(':id/addRecipe')
  addRecipeToItem(
    @Param('id') id: string,
    @Body() body: { whereMade: string; recipeName: string; mats: string },
  ) {
    return this.itemService.addRecipeToItem(
      id,
      body.whereMade,
      body.recipeName,
      body.mats,
    );
  }
}
