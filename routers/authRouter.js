import Router from 'express';
import authController from "../controllers/authController.js";
import {check} from "express-validator";

const authRouter = new Router();

authRouter.post('/registration', [
    check('username', 'username cannot be empty').isEmpty(),
    check('password', 'password cannot be less 4 symbols or more than 10 symbols').isLength({min:4, max:10})
], authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/users', authController.getUsers);

export default authRouter;