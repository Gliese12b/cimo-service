import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDishCommand } from '../create-dish.command';

@CommandHandler(CreateDishCommand)
export class CreateDishHandler implements ICommandHandler<CreateDishCommand> {
  constructor() {}

  async execute(command: CreateDishCommand): Promise<any> {}
}
