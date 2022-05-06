import { IsNotEmpty, IsString } from "class-validator";

export class ItemTagDTO{
    @IsNotEmpty()
    @IsString()
    readonly tag_name: string;
}