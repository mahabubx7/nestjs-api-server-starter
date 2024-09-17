import { TodoModule } from '@app/todo/todo.module';
import { env } from '@config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const { mongoDb } = env(); // environment variables

@Module({
  imports: [MongooseModule.forRoot(mongoDb), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
