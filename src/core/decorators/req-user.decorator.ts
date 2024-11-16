import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface RequestUser {
  id: string;
  uid: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  email: string;
  alias: string;
  iat: number;
  exp: number;
}

export const ReqUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as RequestUser;
});
