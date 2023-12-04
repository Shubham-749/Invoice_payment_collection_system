import * as express from 'express';
import { getAllTransactions, makeTransaction } from '../controllers/payment';

export const router = express.Router()

router.post('/create', makeTransaction);
router.get('/all', getAllTransactions);

module.exports = router;