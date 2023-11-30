import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type UserDocument = User & Document

@Schema()
export class User {

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    nombre: string

    @Prop({ required: true })
    apellidos: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true, })
    telefono: number

    @Prop()
    servicios: string[]

    @Prop()
    localidad: string

    @Prop()
    roles: string[]

    @Prop()
    descripcion: string

    @Prop()
    imgUrl: string
}



export const UserSchema = SchemaFactory.createForClass(User)

