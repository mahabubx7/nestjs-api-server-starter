import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the Todo item',
    example: 'Buy groceries',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'The completation status of the Todo item',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    description: 'The title of the Todo item',
    example: 'Buy groceries',
    required: false, // Set as optional in the Update schema
  })
  title?: string;

  @ApiProperty({
    description: 'The completion status of the Todo item',
    example: false,
    required: false, // Set as optional in the Update schema
  })
  completed?: boolean;
}
