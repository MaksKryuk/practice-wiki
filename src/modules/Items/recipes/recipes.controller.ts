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
import { RecipeDTO } from 'src/modules/dto/recipe.dto';
import { RecipeOutputDTO } from 'src/modules/output-dto/recipe.output.dto';
import { JwtAuthGuard } from 'src/modules/users/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Recipes } from './recipes.model';
import { RecipesService } from './recipes.service';

@Controller('/recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('/')
  async findAll() {
    return (await this.recipesService.findAll()).map((recipe) => new RecipeOutputDTO(recipe));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(
    @Body(new ValidationPipe) recipe: RecipeDTO,
  ) {
    const newRecipe = await this.recipesService.create(
      recipe.where_made,
      recipe.recipe_name,
      recipe.materials,
    );
    return new RecipeOutputDTO(newRecipe);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const recipe = await this.recipesService.findOne(id);
    return new RecipeOutputDTO(recipe);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe) recipe: RecipeDTO,
  ): Promise<RecipeOutputDTO> {
    const updatedRecipe = await this.recipesService.update(
      id,
      recipe.where_made,
      recipe.recipe_name,
      recipe.materials,
    );
    return new RecipeOutputDTO(updatedRecipe);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.recipesService.delete(id);
  }
}
