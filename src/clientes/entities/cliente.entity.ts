import { Exclude } from 'class-transformer';
import { Arquivo } from 'src/arquivos/entities/arquivo.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  razaoSocial: string;

  @Column({ nullable: false })
  endereco: string;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updateAt: Date;

  @OneToMany(() => Arquivo, (arquivo) => arquivo.cliente)
  arquivo: Arquivo;

  @OneToMany(() => Usuario, (usuario) => usuario.cliente)
  usuario: Arquivo;
}
