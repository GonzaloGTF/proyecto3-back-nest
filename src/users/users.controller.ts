import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/local-auth.guard';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    //new User
    @Post("register")
    async createNewUser(@Body() user: any): Promise<any> {
        return await this.usersService.createNewUser(user)
    }

    //find by rol
    @Get(":rol")
    async findEmploys(@Param("rol") rol: string): Promise<any> {
        return await this.usersService.findEmploys(rol)
    }


    //imgUser update
    @UseGuards(JwtAuthGuard)
    @Put('img')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() userId: any) {
        if (file !== undefined && userId !== null) {
            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const id = userId.userId

            return await this.usersService.imgUser(dataUrl, id)
        }
        else {
            return { message: "Seleccione una imagen valida." }
        }
    }

    //employForm update
    @UseGuards(JwtAuthGuard)
    @Put('employ')
    async employUser(@Body() employ: any): Promise<any> {
        return await this.usersService.updateEmploy(employ)
    }

    //Acept-Decline employ
    @UseGuards(JwtAuthGuard)
    @Put('select')
    async selectEmploy(@Body() body: any): Promise<any> {
        return await this.usersService.selectEmploy(body)
    }


    //Update user
    @UseGuards(JwtAuthGuard)
    @Put('update')
    async updateUser(@Body() body: any): Promise<any> {
        const { form, id } = body
        return await this.usersService.updateUser(form, id)
    }
}
