import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipes } from './recipes.model';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipes)
    private recipesModel: typeof Recipes,
  ) {}

  async findAll(): Promise<Recipes[]> {
    return this.recipesModel.findAll();
  }

  async create(
    whereMade: string,
    recipeName: string,
    mats: string,
  ): Promise<Recipes> {
    const recipe = await this.recipesModel.findOne({
      where: { recipe_name: recipeName },
    });
    if (recipe) return recipe;
    return this.recipesModel.create({
      where_made: whereMade,
      recipe_name: recipeName,
      materials: mats,
    });
  }

  findOne(id: string): Promise<Recipes> {
    return this.recipesModel.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    whereMade: string,
    recipeName: string,
    mats: string,
  ): Promise<Recipes> {
    const [, affectedRows] = await this.recipesModel.update(
      { where_made: whereMade, recipe_name: recipeName, materials: mats },
      { where: { id }, returning: true },
    );

    return affectedRows[0];
  }

  async delete(id: string): Promise<void> {
    const recipe = await this.findOne(id);
    await recipe.destroy();
  }
}
