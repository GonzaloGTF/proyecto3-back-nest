import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ComentsService } from './coments.service';

@Controller('coments')
export class ComentsController {
    constructor(private readonly comentService: ComentsService) { }

    //new coment
    @Post("/new")
    async newComment(@Body() coment: any): Promise<any> {
        return await this.comentService.newComment(coment)
    }

    @Get()
    async getComments(): Promise<any> {
        return await this.comentService.getComments()
    }

    @Delete()
    async deleteComment(@Body("id") id: string): Promise<any> {
        await this.comentService.deleteComment(id)
    }
}
