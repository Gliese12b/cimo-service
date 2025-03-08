import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditDishCommand } from '../edit-dish.command';

@CommandHandler(EditDishCommand)
export class EditDishHandler implements ICommandHandler<EditDishCommand> {
  constructor() {}

  async execute(command: EditDishCommand): Promise<any> {}
}
