import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArquivoNotFoundExceptions } from 'src/commom/exceptions/arquivo-not-found-exceptions';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private repository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    try {
      return await this.repository.findOneByOrFail({ id: id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(createClienteDto: CreateClienteDto) {
    const cliente = this.repository.create(createClienteDto);
    return await this.repository.save(cliente);
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    return await this.repository.update(id, updateClienteDto);
  }

  async remove(id: number) {
    const response = await this.repository.delete({ id: id });
    if (response.affected === 0) {
      throw new ArquivoNotFoundExceptions();
    }
    return await this.repository.delete({ id: id });
  }
}
