import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Recipes } from './recipes.model';
import { RecipesService } from './recipes.service';

@Controller('/recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('/')
  findAll() {
    return this.recipesService.findAll();
  }

  @Post('/')
  create(
    @Body() body: { whereMade: string; recipesName: string; mats: string },
  ) {
    return this.recipesService.create(
      body.whereMade,
      body.recipesName,
      body.mats,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { whereMade: string; recipesName: string; mats: string },
  ): Promise<Recipes> {
    return this.recipesService.update(
      id,
      body.whereMade,
      body.recipesName,
      body.mats,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.recipesService.delete(id);
  }
}
