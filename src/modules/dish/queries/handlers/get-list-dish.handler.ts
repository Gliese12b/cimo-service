import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetListDishQuery } from '../get-list-dish.query';

@QueryHandler(GetListDishQuery)
export class GetListDishHandler implements IQueryHandler<GetListDishQuery> {
  constructor() {}

  async execute(query: GetListDishQuery): Promise<any> {}
}
