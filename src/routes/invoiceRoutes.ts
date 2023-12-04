import * as express from 'express';
import { addInvoice, getAllInvoices, getUserInvoicesBasedOnComponent } from '../controllers/invoice';

export const router = express.Router()

router.post('/create', addInvoice);

// Fetches invoices for user based on the component selected - Payer/Receiver
router.get('/user_invoices', getUserInvoicesBasedOnComponent);

// fetch all invoices for admin portal
router.get('/all', getAllInvoices);

module.exports = router;