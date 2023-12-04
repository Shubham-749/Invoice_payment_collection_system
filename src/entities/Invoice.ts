// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PaymentStatus } from '../enums/PaymentStatus';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoice_title: string;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: string;

  @Column()
  payer_id: number;

  @Column()
  receiver_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;
}
