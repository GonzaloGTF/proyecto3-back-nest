import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }


    //validar email + pass 
    async validateUser(email: string, password: string): Promise<any> {

        const user = await this.usersService.findOne(email);

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch) {
                const { password, ...result } = user;

                return result;
            }
        }

        return null;
    }



    //generar token
    async login(user: any) {
        console.log(user)
        const payload = { username: user.email, id: user._id, roles: user.roles }

        return {
            user: user,
            access_token: this.jwtService.sign(payload)
        }
    }


}
