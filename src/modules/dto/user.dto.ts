import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

enum Role{
    ADMIN = 'admin',
    USER = 'user',
}

export class UserDTO{
    @IsNotEmpty()
    @IsEnum(Role)
    readonly role: Role; 
    
    @IsNotEmpty()
    @IsString()
    readonly login: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}