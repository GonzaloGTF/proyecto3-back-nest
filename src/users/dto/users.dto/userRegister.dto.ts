import { IsArray, IsInt, IsString } from "class-validator";

export class UserRegisterDto {
    @IsString()
    nombre: string

    @IsString()
    apellidos: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsInt()
    telefono: number

    @IsArray()
    @IsString({ each: true })
    servicios: string[]

    @IsString({ each: true })
    localidad: string[]

    @IsArray()
    @IsString({ each: true })
    roles: string[]

    @IsString()
    descripcion: string

    @IsString()
    imgUrl: string


}
