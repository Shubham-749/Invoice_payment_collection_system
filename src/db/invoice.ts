import AppDataSource from "../../config/ormconfig";
import { Invoice } from "../entities/Invoice";

const InvoiceRepository = AppDataSource.getRepository(Invoice);

export const getAllInvoices = () => InvoiceRepository.find();
export const getInvoiceById = (invoice_id: number) => InvoiceRepository.findOneBy({id: invoice_id});
export const getReceiverInvoices = (user_id: number) => InvoiceRepository.findBy({ receiver_id: user_id });
export const getPayerInvoices = (user_id: number) => InvoiceRepository.findBy({ payer_id: user_id });
export const addOrUpdateInvoice = (invoice: Invoice) => InvoiceRepository.save(invoice);

