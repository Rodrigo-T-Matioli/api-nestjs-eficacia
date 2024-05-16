import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Cliente } from 'src/clientes/entities/cliente.entity';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString({ message: 'O nome do arquivo deve ser uma string' })
  @Length(3, 150, { message: 'O nome precisa ter entre 3 a 150 caracteres' })
  @Transform(({ value }) => value.toLowerCase())
  nome: string;
  @IsNotEmpty({ message: 'E-mail não pode ser vazio' })
  @IsString({ message: 'O nome do arquivo deve ser uma string' })
  @Length(7, 150, { message: 'O e-mail precisa ter entre 7 a 150 caracteres' })
  email: string;
  @IsString({ message: 'O endereco deve ser uma string' })
  @Length(3, 250, {
    message: 'O endereço precisa ter entre 3 a 250 caracteres',
  })
  endereco: string;
  @IsString({ message: 'O telefone deve ser uma string' })
  @Length(9, 12, { message: 'O telefone precisa ter entre 9 a 12 caracteres' })
  telefone: string;
  @IsNotEmpty({ message: 'Senha não pode ser vazio' })
  @IsString({ message: 'O senha deve ser uma string' })
  @Length(8, 12, { message: 'O senha precisa ter entre 8 a 12 caracteres' })
  senha: string;
  status: string;
  tipo: string;
  cliente: Cliente;
}
