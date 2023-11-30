import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserRegisterDto } from './dto/users.dto/userRegister.dto';
import * as bcrypt from 'bcrypt';
import { UserEmployDto } from './dto/users.dto/userEmploy';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    //Auth: find user -> email
    async findOne(email: string): Promise<any | undefined> {
        let user = await this.userModel.findOne({ email: email }).lean();
        return user;
    }



    //new User + hashedPassword
    async createNewUser(user: UserRegisterDto): Promise<any> {
        try {
            const { nombre, apellidos, email, password, telefono } = user;

            if (password.length < 9) {
                throw new BadRequestException("La contraseña debe tener al menos 9 caracteres");
            }
            if (!/@/.test(email)) {
                throw new BadRequestException("Escriba un email valido")
            }
            if (isNaN(Number(telefono)) || String(telefono).length !== 9) {
                throw new BadRequestException("Escriba un numero de telefono valido");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await this.userModel.create({
                nombre: nombre,
                apellidos: apellidos,
                email: email,
                password: hashedPassword,
                telefono: telefono,
                roles: ["user"],
                imgUrl: null,
                descripcion: null
            });

            return await this.userModel.findOne({ email: email });

        } catch (e) {
            console.error('Error al crear el usuario:', e);
            if (e.name === "MongoServerError" && e.code === 11000) {
                throw new BadRequestException("El email ya esta registrado")
            }
            else if (e.message == `Escriba un email valido`) {
                throw new BadRequestException(e.message)
            }
            else if (e.message == `Escriba un numero de telefono valido`) {
                throw new BadRequestException(e.message)
            }
            else if (e.message == `La contraseña debe tener al menos 9 caracteres`) {
                throw new BadRequestException(e.message)
            }
            else {
                throw new BadRequestException('Rellene todos los datos')
            }
        }
    }

    //find employees by rol
    async findEmploys(rol: string): Promise<any> {
        return await this.userModel.find({ roles: { $in: [rol] } });
    }



    //update imgUser (jwt)
    async imgUser(dataUrl: string, userId: string): Promise<any> {

        if (dataUrl.includes("image")) {
            await this.userModel.updateOne({ _id: userId }, { $set: { imgUrl: dataUrl } })
            return await this.userModel.findOne({ _id: userId });
        }
        else {
            throw new BadRequestException('Error al subir la imagen')
        }
    }


    //Update to employ (jwt)
    async updateEmploy(employ: UserEmployDto): Promise<any> {
        const { profesion, localidad, descripcion, id } = employ;
        if (localidad == "" || profesion.length == 0) {
            throw new BadRequestException('Rellene los campos *obligatorios')
        } else {
            await this.userModel.updateOne({ _id: id }, {
                $set: { servicios: profesion, localidad: localidad, descripcion: descripcion },
                $addToSet: { roles: "pending" }
            })
            return await this.userModel.findOne({ _id: id });
        }
    }

    //Acept-Decline employ
    async selectEmploy(body: any): Promise<any> {
        const { id, boolean } = body;

        if (boolean) {
            await this.userModel.updateOne({ _id: id, roles: "pending" },
                { $set: { "roles.$": "employ" } })
        }
        else {
            await this.userModel.updateOne({ _id: id }, { $pull: { roles: "pending" } }
            );
        }
    }
}
