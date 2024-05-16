import { Arquivo } from 'src/arquivos/entities/arquivo.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  endereco: string | null;

  @Column()
  telefone: string | null;

  @Column({ nullable: false })
  senha: string;

  @Column({ nullable: false, default: () => "'I'" })
  status: string;

  @Column({ nullable: false, default: () => "'editor'" })
  tipo: string;

  @OneToMany(() => Arquivo, (usuario) => usuario.usuario, { eager: true })
  arquivo: Arquivo;

  @ManyToOne(() => Cliente, (cliente) => cliente.usuario)
  @JoinColumn({ name: 'cliente_usuario_id' })
  cliente: Cliente;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updateAt: Date;
}
