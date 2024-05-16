import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivosController } from './arquivos.controller';
import { ArquivosService } from './arquivos.service';
import { Arquivo } from './entities/arquivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Arquivo])],
  controllers: [ArquivosController],
  providers: [ArquivosService],
})
export class ArquivosModule {}
