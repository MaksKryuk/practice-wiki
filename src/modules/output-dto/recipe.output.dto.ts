export class RecipeOutputDTO{

    readonly id: string;

    readonly where_made: string;

    readonly recipe_name: string;

    readonly materials: string;

    constructor(data){
        this.id = data.id;
        this.where_made = data.where_made;
        this.recipe_name = data.recipe_name
        this.materials = data.materials;
    }
}