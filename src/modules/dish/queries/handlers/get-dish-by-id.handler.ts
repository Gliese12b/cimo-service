import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetDishByIdQuery } from '../get-dish-by-id.query';

@QueryHandler(GetDishByIdQuery)
export class GetDishByIdHandler implements IQueryHandler<GetDishByIdQuery> {
  constructor() {}

  async execute(query: GetDishByIdQuery): Promise<any> {}
}
