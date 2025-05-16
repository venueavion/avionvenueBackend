// src/pipes/parse-id.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const id = parseInt(value, 10);
    if (isNaN(id)) {
      throw new BadRequestException('ID must be a number');
    }
    return id;
  }
}