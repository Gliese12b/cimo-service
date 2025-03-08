import { ICommand } from '@nestjs/cqrs';

export class EditDishCommand implements ICommand {
  constructor(public readonly body: any) {}
}
