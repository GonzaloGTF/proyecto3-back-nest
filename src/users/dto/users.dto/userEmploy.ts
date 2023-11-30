import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UserEmployDto {
    @IsArray()
    @IsString({ each: true })
    profesion: string[]

    @IsString()
    localidad: string

    @IsArray()
    @IsString({ each: true })
    roles: string[]

    @IsString()
    descripcion: string

    @IsString()
    id: string

}
