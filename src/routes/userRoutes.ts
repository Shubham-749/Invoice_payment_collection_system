import * as express from 'express';
import { deactivateUser, getAllUsers, signin, signup } from '../controllers/users';
import { check } from 'express-validator';

export const router = express.Router()

router.post('/signup', [
    check("name", "Valid name is required").not().isEmpty(),
    check("email", "Valid email is required").not().isEmpty().isEmail(),
    check("password", "Please enter password of length 8 or above").isLength({ min: 8 })],
    signup);

router.get('/login',
    check("email", "Valid email is required").not().isEmpty().isEmail(),
    check("password", "Please enter password of length 8 or above").isLength({ min: 8 }),
    signin)

// admin APIs. Todo - implement authorization
router.get('/all', getAllUsers);
router.post('/deactivate', deactivateUser);

module.exports = router;