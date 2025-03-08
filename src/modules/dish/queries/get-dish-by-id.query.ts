import { IQuery } from '@nestjs/cqrs';

export class GetDishByIdQuery implements IQuery {
  constructor(public readonly body: any) {}
}
