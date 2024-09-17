import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
