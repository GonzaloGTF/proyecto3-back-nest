import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentsModule } from './coments/coments.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017/ServiciosWeb"),
    UsersModule, AuthModule, ComentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
