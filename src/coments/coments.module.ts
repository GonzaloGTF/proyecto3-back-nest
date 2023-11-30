import { Module } from '@nestjs/common';
import { ComentsController } from './coments.controller';
import { ComentsService } from './coments.service';
import { Coment, ComentSchema } from './coment.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Coment.name,
    schema: ComentSchema
  }])],
  controllers: [ComentsController],
  providers: [ComentsService]
})
export class ComentsModule { }
