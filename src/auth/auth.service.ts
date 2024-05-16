import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}
  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioService.findOneUser(email);
    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    this.tokenService.save(token, user.email);
    return {
      access_token: token,
    };
  }
}
