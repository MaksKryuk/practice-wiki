import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ArticleTextblockDTO{
 
    @IsString()
    @IsNotEmpty()
    readonly text: string;
 
    @IsNotEmpty()
    @IsNumber()
    readonly positionNumber: string;
}