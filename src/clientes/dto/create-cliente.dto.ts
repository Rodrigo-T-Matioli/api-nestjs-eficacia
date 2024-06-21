import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty({ message: 'Razão social não pode ser vazio' })
  @IsString({ message: 'A razão social deve ser uma string' })
  @Length(3, 250, {
    message: 'A razão social precisa ter entre 3 a 250 caracteres',
  })
  razaoSocial: string;
}
