import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
// import { ArquivoNotFoundExceptions } from 'src/commom/exceptions/arquivo-not-found-exceptions';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private repository: Repository<Usuario>,
  ) {}

  async findAll() {
    return await this.repository.find({
      relations: {
        cliente: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.repository.findOneByOrFail({ id: id });
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioPasHash = new CreateUsuarioDto();
    usuarioPasHash.nome = createUsuarioDto.nome;
    usuarioPasHash.email = createUsuarioDto.email;
    usuarioPasHash.endereco = createUsuarioDto.endereco;
    usuarioPasHash.telefone = createUsuarioDto.telefone;
    usuarioPasHash.senha = bcrypt.hashSync(createUsuarioDto.senha, 8);
    usuarioPasHash.status = createUsuarioDto.status;
    usuarioPasHash.tipo = createUsuarioDto.tipo;
    usuarioPasHash.cliente = createUsuarioDto.cliente;
    const usuario = this.repository.create(usuarioPasHash);
    return await this.repository.save(usuario);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.repository.update(id, updateUsuarioDto);
  }

  async remove(id: number) {
    return await this.repository.delete({ id: id });
  }

  async findOneUser(email: string): Promise<Usuario | undefined> {
    return await this.repository.findOneByOrFail({ email: email });
  }
}
