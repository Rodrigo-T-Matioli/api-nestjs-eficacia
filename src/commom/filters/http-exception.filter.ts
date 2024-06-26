import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

Catch(HttpException);
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    // const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    if (exception instanceof InternalServerErrorException) {
      response.status(500).send({
        statusCode: 500,
        message: `Erro Interno`,
        error: exception.name,
      });
    }
    if (typeof exception.getStatus === 'function') {
      response.status(exception.getStatus()).send(exception);
    } else {
      response.status(500).send({
        statusCode: 500,
        message: 'Erro interno do servidor',
        error: 'InternalServerErrorException',
      });
    }
  }
}
