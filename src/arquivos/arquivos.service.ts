import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArquivoNotFoundExceptions } from '../commom/exceptions/arquivo-not-found-exceptions';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import { Arquivo } from './entities/arquivo.entity';

@Injectable()
export class ArquivosService {
  constructor(
    @InjectRepository(Arquivo)
    private repository: Repository<Arquivo>,
  ) {}

  async findAll(): Promise<Arquivo[]> {
    try {
      new InternalServerErrorException();
      return await this.repository.find({
        relations: {
          cliente: true,
          categoria: true,
          usuario: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number): Promise<Arquivo> {
    try {
      return await this.repository.findOneByOrFail({ id: id });
    } catch (error) {
      if (error.name == 'EntityNotFoundError') {
        throw new ArquivoNotFoundExceptions();
      }
      throw new InternalServerErrorException();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createArquivoDto: CreateArquivoDto) {
    const arquivo = this.repository.create(createArquivoDto);
    return await this.repository.save(arquivo);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, updateArquivoDto: UpdateArquivoDto) {
    return await this.repository.update(id, updateArquivoDto);
  }

  async remove(id: number) {
    const response = await this.repository.delete({ id: id });
    if (response.affected === 0) {
      throw new ArquivoNotFoundExceptions();
    }
    return await this.repository.delete({ id: id });
  }
}
