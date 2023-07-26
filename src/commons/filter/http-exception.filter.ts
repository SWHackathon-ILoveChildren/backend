import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const method = request.method;
    const status = exception.getStatus();
    const { name, message } = exception;
    const total = {
      name,
      statusCode: status,
      timestamp: new Date().toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
      path: request.url,
      method,
      message,
    };

    console.log('😒😒😒');
    console.log(total);

    response.status(status).json(total);
  }
}
