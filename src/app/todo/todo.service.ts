import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { Todo } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private readonly todos: Model<Todo>) {}

  // ADD: Todo
  async addTodo(todo: CreateTodoDto) {
    return await this.todos.create(todo);
  }

  // GET: (One) Todo
  async getOneTodo(id: ObjectId) {
    return await this.todos.findById(id);
  }

  // GET: (list) Todos
  async getTodos() {
    return await this.todos.find();
  }

  // UPDATE: Todo
  async updateTodo(id: ObjectId, payload: UpdateTodoDto) {
    return await this.todos.findByIdAndUpdate(id, payload, { new: true });
  }

  // REMOVE: Todo
  async removeTodo(id: ObjectId) {
    return await this.todos.findByIdAndDelete(id);
  }
}
