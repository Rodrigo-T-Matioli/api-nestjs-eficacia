import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArquivoNotFoundExceptions } from 'src/commom/exceptions/arquivo-not-found-exceptions';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private repository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number): Promise<Categoria> {
    try {
      return await this.repository.findOneByOrFail({ id: id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.repository.create(createCategoriaDto);
    return await this.repository.save(categoria);
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return await this.repository.update(id, updateCategoriaDto);
  }

  async remove(id: number) {
    const response = await this.repository.delete({ id: id });
    if (response.affected === 0) {
      throw new ArquivoNotFoundExceptions();
    }
    return await this.repository.delete({ id: id });
  }
}
