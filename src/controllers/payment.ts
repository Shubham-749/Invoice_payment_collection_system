import * as TransactionRepository from '../db/payment';
import * as InvoiceRepository from '../db/invoice';
import { Request, Response } from "express";
import { PaymentMethod } from '../enums/PaymentMethod';
import { Transaction } from '../entities/Transaction';
import { TransactionStatus } from '../enums/TransactionStatus';
import { updateInvoice } from './invoice';
import AppDataSource from '../../config/ormconfig';
import { PaymentStatus } from '../enums/PaymentStatus';

export const makeTransaction = async (req: Request, res: Response) => {

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.startTransaction();

  try {
    const { invoice_id, payment_mode } = req.body;

    const transaction = new Transaction();
    transaction.invoice_id = Number(invoice_id);
    transaction.mode = payment_mode;

    const invoice = await InvoiceRepository.getInvoiceById(Number(invoice_id));
    if(!invoice || invoice.status !== PaymentStatus.PAID)     { 
      return res.status(400).json({ error: "Invalid invoice_id" });
    }

    if(invoice.status === PaymentStatus.PAID)     { 
      return res.status(400).json({ error: "Already paid" });
    }

    if (payment_mode === PaymentMethod.PAYTM_WALLET) makePaytmTransfer();
    else if (payment_mode === PaymentMethod.CREDIT_CARD) makeCreditCardTransfer();

    transaction.status = TransactionStatus.SUCCESS;

    await TransactionRepository.addOrUpdateTransaction(transaction);
    await updateInvoice(Number(invoice_id), PaymentStatus.PAID);

    await queryRunner.commitTransaction();
    return res.status(200).json({ "success": true  });
  } catch (error) {
    await queryRunner.rollbackTransaction();
    return res.sendStatus(400).json({ error: "Transaction failed" });;
  } finally {
    await queryRunner.release();
  }
}

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const invoices = await TransactionRepository.getAllTransactions();

    return res.status(200).json(invoices);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const makePaytmTransfer = () => {
  return;
}

const makeCreditCardTransfer = () => {
  return;
}
