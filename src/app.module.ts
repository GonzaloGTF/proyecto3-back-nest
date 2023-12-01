import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentsModule } from './coments/coments.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://gonzalo:${process.env.MONGODB_PWD}@cluster0.loxsizg.mongodb.net/ServiciosWeb/?retryWrites=true&w=majority`),
    UsersModule, AuthModule, ComentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
