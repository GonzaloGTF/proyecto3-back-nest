import { BadRequestException, Injectable } from '@nestjs/common';
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
            await this.comentModel.create(coment);
            return ({ message: "Comentario enviado" });
        } catch (e) {
            console.error('Error al añadir comentario:', e);
            throw new BadRequestException("Rellene los datos")
        }
    }



    //get comments
    async getComments(): Promise<any> {
        return await this.comentModel.find();
    }
}
