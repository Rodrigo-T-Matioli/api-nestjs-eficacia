import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'Categoria não pode ser vazio' })
  @IsString({ message: 'A categoria deve ser uma string' })
  @Length(1, 20, {
    message: 'A categoria precisa ter no máximo 20 caracteres',
  })
  @Transform(({ value }) => value.toLowerCase())
  categoria: string;
}
