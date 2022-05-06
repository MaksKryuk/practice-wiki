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
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from '../users/auth/jwt-auth.guard';
import { ItemTagDTO } from '../dto/item-tag.dto';
import { ItemDTO } from '../dto/item.dto';
import { RecipeDTO } from '../dto/recipe.dto';
import { ItemService } from './item.service';
import { ItemOutPutDTO } from '../output-dto/item.output.dto';

@Controller('/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  async findAll() {
    return (await this.itemService.findAll()).map((item) => new ItemOutPutDTO(item));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body(new ValidationPipe) item: ItemDTO) {
    const newItem = await this.itemService.create(item.itemName);
    return new ItemOutPutDTO(newItem);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const item = await this.itemService.findOne(id);  
    return new ItemOutPutDTO(item) ;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe) item: ItemDTO,
  ): Promise<ItemOutPutDTO> {
    const updatedItem = await this.itemService.update(id, item.itemName);
    return new ItemOutPutDTO(updatedItem);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/addTag')
  async addTag(@Param('id') id: string, @Body(new ValidationPipe) tag: ItemTagDTO) {
    const newTag = await this.itemService.addTagToItem(id, tag.tag_name);
    return newTag;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/addRecipe')
  async addRecipeToItem(
    @Param('id') id: string,
    @Body(new ValidationPipe) recipe: RecipeDTO,
  ) {
    const newRecipe = await this.itemService.addRecipeToItem(
      id,
      recipe.where_made,
      recipe.recipe_name,
      recipe.materials,
    );
    return newRecipe;
  }
}
