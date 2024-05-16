import { HttpException, HttpStatus } from '@nestjs/common';

export class ArquivoNotFoundExceptions extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(message || 'Arquivo não encontrado', status || HttpStatus.NOT_FOUND);
  }
}
