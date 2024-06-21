import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export class CreateArquivoDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString({ message: 'O nome do arquivo deve ser uma string' })
  @Length(3, 150, { message: 'O nome precisa ter entre 3 a 150 caracteres' })
  nome: string;
  @IsNotEmpty({ message: 'Arquivo não pode ser vazio' })
  @IsString({ message: 'O arquivo deve ser uma string' })
  @Length(3, 150, { message: 'O arquivo precisa ter entre 3 a 150 caracteres' })
  @Expose({ name: 'arquivo_completo' })
  arquivo: string;
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsNumber({}, { message: 'Cliente deve receber um número' })
  @Min(1, { message: 'Número mínimo 1' })
  @Max(1000, { message: 'Número máximo 1000' })
  cliente: Cliente;
  @IsNotEmpty({ message: 'Categoria não pode ser vazio' })
  @IsNumber({}, { message: 'Categoria deve receber um número' })
  @Min(1, { message: 'Número mínimo 1' })
  @Max(1000, { message: 'Número máximo 1000' })
  categoria: Categoria;
  @IsNotEmpty({ message: 'Usuario não pode ser vazio' })
  @IsNumber({}, { message: 'Usuario deve receber um número' })
  usuario: Usuario;
}
