import * as InvoiceRepository from '../db/invoice';
import { Request, Response } from "express";
import { Invoice } from '../entities/Invoice';
import { UserComponent } from '../enums/UserComponent';

export const addInvoice = async (req: Request, res: Response) => {
    try {
        const { amount, payer_id, receiver_id, invoice_title } = req.body;
        const invoice = new Invoice();
        invoice.amount = Number(amount);
        invoice.payer_id = Number(payer_id);
        invoice.receiver_id = Number(receiver_id);
        invoice.invoice_title = invoice_title;
        console.log(invoice);
        await InvoiceRepository.addOrUpdateInvoice(invoice);
        return res.status(200).json(invoice);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllInvoices = async (req: Request, res: Response) => {
    try {
        const invoices = await InvoiceRepository.getAllInvoices();

        return res.status(200).json(invoices);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getInvoice = async (req: Request, res: Response) => {
    try {
        const { invoice_id } = req.params;

        const invoice = await InvoiceRepository.getInvoiceById(Number(invoice_id));

        return res.status(200).json(invoice);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateInvoice = async (invoice_id: number, status: string) => {
    try {

        const invoice = await InvoiceRepository.getInvoiceById(Number(invoice_id));
        invoice.status = status;
        console.log(invoice);       
        await InvoiceRepository.addOrUpdateInvoice(invoice);
        return;
    } catch (error) {
        console.log(error);
    }
}

export const getUserInvoicesBasedOnComponent = async (req: Request, res: Response) => {
    try {
        const { user_id, component } = req.query;

        let invoices: Invoice[];

        if (component === UserComponent.RECEIVER) {
            invoices = await InvoiceRepository.getReceiverInvoices(Number(user_id));
        }
        else if (component === UserComponent.PAYER) {
            invoices = await InvoiceRepository.getPayerInvoices(Number(user_id));
        } else {
            return res.sendStatus(400);
        }

        return res.status(200).json(invoices);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

