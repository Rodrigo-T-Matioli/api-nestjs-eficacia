import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private repository: Repository<Token>,
    private usuarioService: UsuariosService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async save(hash: string, username: string) {
    const objToken = await this.repository.findOneByOrFail({
      username: username,
    });
    if (objToken) {
      this.repository.update(objToken.id, {
        hash: hash,
      });
    } else {
      this.repository.insert({
        hash: hash,
        username: username,
      });
    }
  }

  async refreshToken(oldToken: string) {
    const objToken = await this.repository.findOneBy({
      hash: oldToken,
    });
    if (objToken) {
      const usuario = await this.usuarioService.findOneUser(objToken.username);
      return this.authService.login(usuario);
    } else {
      return new HttpException(
        {
          errorMessage: 'Token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
