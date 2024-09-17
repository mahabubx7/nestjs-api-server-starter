import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class MongoDbID implements PipeTransform<string> {
  transform(value: string) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a valid MongoDB ObjectId`);
    }
    return value as string;
  }
}
