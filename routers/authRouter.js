import Router from 'express';
import authController from "../controllers/authController.js";
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from "../middleware/roleMiddleware.js";
import {check} from "express-validator";

const authRouter = new Router();

authRouter.post('/registration', [
    check('username', 'username cannot be empty').notEmpty(),
    check('password', 'password cannot be less than 4 and more than 10 symbols').isLength({min:4,max:10})
], authController.registration);
authRouter.post('/login', [
    check('username', 'username cannot be empty').notEmpty(),
    check('password', 'password cannot be empty').notEmpty()
], authController.login);
authRouter.get('/users', roleMiddleware(['USER']), authController.getUsers);

export default authRouter;