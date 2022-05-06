import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class TextblockDTO{

    @IsNotEmpty()
    @IsString()
    @MinLength(50)
    readonly text: string;
}