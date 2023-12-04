// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PaymentMethod } from '../enums/PaymentMethod';
import { TransactionStatus } from '../enums/TransactionStatus';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoice_id: number;

  @Column({ type: 'enum', enum: TransactionStatus })
  status: string;

  @Column({ type: 'enum', enum: PaymentMethod })
  mode: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;
}