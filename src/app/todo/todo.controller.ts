import { MongoDbID } from '@common/pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodoService } from './todo.service';

@Controller({
  path: 'todo',
  version: ['1'],
})
@ApiTags('Todo')
export class TodoController {
  constructor(@Inject() private readonly todoSrv: TodoService) {}

  @Get('')
  @ApiOperation({ summary: 'Get the list of your Todos' })
  @ApiResponse({
    status: 200,
    description: 'The Todo items has been successfully retrieved.',
    schema: {
      example: [
        {
          id: '60d5f4f4f4f4f4f4f4f4f4f4',
          title: 'Buy groceries',
          completed: false,
          createAt: '2024-09-17T08:25:37.272Z',
          updatedAt: '2024-09-17T08:25:37.272Z',
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  async getTodos() {
    return await this.todoSrv.getTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Todo item by ID' })
  @ApiParam({
    name: 'id',
    description: 'The MongoDB ObjectId of the Todo item',
    example: '60d5f4f4f4f4f4f4f4f4f4f4',
  })
  @ApiResponse({
    status: 400,
    description: '{id} is not a valid MongoDB ObjectId',
    schema: {
      example: {
        message: '{id} is not a valid MongoDB ObjectId',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The Todo item has been successfully retrieved.',
    schema: {
      example: {
        id: '60d5f4f4f4f4f4f4f4f4f4f4',
        title: 'Buy groceries',
        completed: false,
        createAt: '2024-09-17T08:25:37.272Z',
        updatedAt: '2024-09-17T08:25:37.272Z',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async getTodoById(@Param('id', MongoDbID) id: ObjectId) {
    return await this.todoSrv.getOneTodo(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Add new Todo item' })
  @ApiResponse({
    status: 201,
    description: 'The Todo item has been successfully added.',
    schema: {
      example: {
        id: '60d5f4f4f4f4f4f4f4f4f4f4',
        title: 'Buy groceries',
        completed: false,
        createAt: '2024-09-17T08:25:37.272Z',
        updatedAt: '2024-09-17T08:25:37.272Z',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  async addTodo(@Body() payload: CreateTodoDto) {
    return await this.todoSrv.addTodo(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Todo item by ID' })
  @ApiParam({
    name: 'id',
    description: 'The MongoDB ObjectId of the Todo item',
    example: '60d5f4f4f4f4f4f4f4f4f4f4',
  })
  @ApiResponse({
    status: 400,
    description: '{id} is not a valid MongoDB ObjectId',
    schema: {
      example: {
        message: '{id} is not a valid MongoDB ObjectId',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 202,
    description: 'The Todo item has been successfully updated.',
    schema: {
      example: {
        id: '60d5f4f4f4f4f4f4f4f4f4f4',
        title: 'Buy groceries [done]',
        completed: true,
        createAt: '2024-09-17T08:25:37.272Z',
        updatedAt: '2024-09-17T08:25:37.272Z',
      },
    },
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async updateTodo(
    @Param('id', MongoDbID) id: ObjectId,
    @Body() payload: UpdateTodoDto,
  ) {
    return await this.todoSrv.updateTodo(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Todo item by ID' })
  @ApiParam({
    name: 'id',
    description: 'The MongoDB ObjectId of the Todo item',
    example: '60d5f4f4f4f4f4f4f4f4f4f4',
  })
  @ApiResponse({
    status: 400,
    description: '{id} is not a valid MongoDB ObjectId',
    schema: {
      example: {
        message: '{id} is not a valid MongoDB ObjectId',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 202,
    description: 'The Todo item has been successfully deleted.',
    schema: {
      example: {
        id: '60d5f4f4f4f4f4f4f4f4f4f4',
        title: 'Buy groceries',
        completed: true,
        createAt: '2024-09-17T08:25:37.272Z',
        updatedAt: '2024-09-17T08:25:37.272Z',
      },
    },
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async removeTodo(@Param('id', MongoDbID) id: ObjectId) {
    return await this.todoSrv.removeTodo(id);
  }
}
