import { Expose } from 'class-transformer';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Arquivo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  nome: string;
  @Column({ nullable: false })
  @Expose({ name: 'arquivo_completo' })
  arquivo: string;
  @ManyToOne(() => Cliente, (cliente) => cliente.arquivo)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;
  @ManyToOne(() => Categoria, (categoria) => categoria.arquivo)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
  @ManyToOne(() => Usuario, (usuario) => usuario.arquivo)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
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
