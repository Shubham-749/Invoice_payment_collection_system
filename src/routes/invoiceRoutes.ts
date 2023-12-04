import * as express from 'express';
import { addInvoice, getAllInvoices, getUserInvoicesBasedOnComponent } from '../controllers/invoice';

export const router = express.Router()

router.post('/create', addInvoice);
router.get('/all', getAllInvoices);
router.get('/user_invoices', getUserInvoicesBasedOnComponent);

module.exports = router;