import AppDataSource from "../../config/ormconfig";
import { Transaction } from "../entities/Transaction";

const TransactionRepository = AppDataSource.getRepository(Transaction);

export const getAllTransactions = () => TransactionRepository.find();
export const getInvoiceTransactionHistory = (invoice_id: number) => TransactionRepository.findBy({invoice_id});
export const addOrUpdateTransaction = (transaction: Transaction) => TransactionRepository.save(transaction);