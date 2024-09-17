import { MongoDbID } from '@common/pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodoService } from './todo.service';

@Controller({
  path: 'todo',
  version: ['1'],
})
export class TodoController {
  constructor(@Inject() private readonly todoSrv: TodoService) {}

  @Get('')
  async getTodos() {
    return await this.todoSrv.getTodos();
  }

  @Get(':id')
  async getTodoById(@Param('id', MongoDbID) id: ObjectId) {
    return await this.todoSrv.getOneTodo(id);
  }

  @Post('')
  async addTodo(@Body() payload: CreateTodoDto) {
    return await this.todoSrv.addTodo(payload);
  }

  @Put(':id')
  async updateTodo(
    @Param('id', MongoDbID) id: ObjectId,
    @Body() payload: UpdateTodoDto,
  ) {
    return await this.todoSrv.updateTodo(id, payload);
  }

  @Delete(':id')
  async removeTodo(@Param('id', MongoDbID) id: ObjectId) {
    return await this.todoSrv.removeTodo(id);
  }
}
