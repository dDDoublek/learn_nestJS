import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: string) {
    value = value.toUpperCase();

    if (this.isStatusValid(value) !== 1) {
      throw new BadRequestException(`${value} isn't in the status option`);
    }

    return value;
  }

  private isStatusValid(status: any): number {
    return this.StatusOptions.indexOf(status);
  }
}
