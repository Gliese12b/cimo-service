import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const ApiKeyGuardTypeKey = 'api-key';

@Injectable()
export class ApiKeyGuard extends AuthGuard(ApiKeyGuardTypeKey) {}
