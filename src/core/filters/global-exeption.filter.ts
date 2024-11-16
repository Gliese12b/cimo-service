import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorDto } from '../@types/dtos';
import { getStack } from '@/utils';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: object & HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception?.getStatus?.() ?? 500;
    const { message, error } = (exception.getResponse?.() || {}) as {
      message: string;
      error: unknown;
    };

    response.status(status).json({
      success: false,
      code: status,
      errorId: HttpStatus[status],
      error: error,
      stack: getStack(exception),
      message: message ?? 'Internal server error',
      timestamp: new Date().getTime(),
      path: request.url,
    } satisfies ApiErrorDto);
  }
}
