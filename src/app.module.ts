import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArquivosModule } from './arquivos/arquivos.module';
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ClientesModule } from './clientes/clientes.module';
import { HttpExceptionFilter } from './commom/filters/http-exception.filter';
import { TokenModule } from './token/token.module';
import { UploadsModule } from './uploads/uploads.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // type: 'mysql',
      // host: '127.0.0.1',
      // port: 3306,
      // username: 'root',
      // password: 'R0dr1g0_#',
      // entities: [join(__dirname, '**/*entity.{ts,js}')],
      // database: 'eficaciacontab',
      // synchronize: true,
      // namingStrategy: new SnakeNamingStrategy(),
      // -------------------------------------------------------------------
      // type: 'mysql',
      // host: 'mysql.eficaciacontabil.kinghost.net',
      // username: 'eficaciacontab',
      // password: 'Eu74185256Du74520',
      // entities: [join(__dirname, '**/*entity.{ts,js}')],
      // database: 'eficaciacontab',
      // synchronize: true,
      // namingStrategy: new SnakeNamingStrategy(),
      // -------------------------------------------------------------------
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      entities: [join(__dirname, '**/*entity.{ts,js}')],
      database: process.env.DATABASE_NAME,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ClientesModule,
    ArquivosModule,
    UploadsModule,
    CategoriasModule,
    UsuariosModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
