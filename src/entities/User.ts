// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserStatus } from '../enums/UserStatus';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;
}
