import { IsNotEmpty, IsString } from "class-validator";

export class ItemDTO{
    
    @IsNotEmpty()
    @IsString()
    readonly itemName: string;
}