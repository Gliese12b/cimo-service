import { I } from '@nestjs/cqrs';

export class GetUser implements I {
  constructor(public readonly body: any) {}
}
