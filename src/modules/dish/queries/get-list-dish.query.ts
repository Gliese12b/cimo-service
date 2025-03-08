import { IQuery } from '@nestjs/cqrs';

export class GetListDishQuery implements IQuery {
  constructor(public readonly body: any) {}
}
