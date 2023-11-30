import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type ComentDocument = Coment & Document

@Schema()
export class Coment {

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    comentario: string
}

export const ComentSchema = SchemaFactory.createForClass(Coment)

