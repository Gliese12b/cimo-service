import { ICommand } from '@nestjs/cqrs';

export class CreateDishCommand implements ICommand {
  constructor(public readonly body: any) {}
}
