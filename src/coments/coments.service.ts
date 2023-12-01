import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Coment } from './coment.schema';
import { ComentDocument } from 'src/coments/coment.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ComentsService {
    constructor(@InjectModel(Coment.name) private comentModel: Model<ComentDocument>) { }

    //new User + hashedPassword
    async newComment(coment: any): Promise<any> {
        try {
            if (!/@/.test(coment.email)) {
                throw new BadRequestException("Escriba un email valido")
            }

            await this.comentModel.create(coment);
            return ({ message: "Comentario enviado" });
        } catch (e) {
            console.error('Error al añadir comentario:', e);
            if (e.message == `Escriba un email valido`) {
                throw new BadRequestException(e.message)
            } else {
                throw new BadRequestException("Rellene el formulario")
            }
        }
    }



    //get comments
    async getComments(): Promise<any> {
        return await this.comentModel.find();
    }


    //delete comment
    async deleteComment(id: string): Promise<any> {
        await this.comentModel.deleteOne({ _id: id });
    }
}
