import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDoc = HydratedDocument<Todo>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Todo {
  @Prop()
  title: string;

  @Prop({ default: false })
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
