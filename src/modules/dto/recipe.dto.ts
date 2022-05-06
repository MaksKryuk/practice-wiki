import { IsNotEmpty, IsString } from "class-validator";

export class RecipeDTO{
    @IsNotEmpty()
    @IsString()
    readonly where_made: string;

    @IsNotEmpty()
    @IsString()
    readonly recipe_name: string;
    
    @IsNotEmpty()
    @IsString()
    readonly materials: string;
}