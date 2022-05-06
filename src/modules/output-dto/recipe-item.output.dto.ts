export class RecipeItemOutputDTO{
    readonly id: string;

    readonly where_made: string;

    readonly recipe_name: string;

    readonly materials: string;

    readonly recipes: any;

    constructor(data){
        this.id = data.id;
        this.where_made = data.where_made;
        this.recipe_name = data.recipe_name
        this.materials = data.materials;
        this.recipes = data.recipes;
    }
}