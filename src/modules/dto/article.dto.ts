import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class ArticleDTO{

    @IsNumber()
    @IsNotEmpty()
    readonly item_id: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    readonly article_name: string; 
}