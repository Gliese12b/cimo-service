import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const AuthGuardTypeKey = 'jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthGuardTypeKey) {}
