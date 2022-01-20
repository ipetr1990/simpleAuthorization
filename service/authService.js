import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import {validationResult} from "express-validator";

class AuthService {
    async registration (username, password) {
        const candidate = await User.findOne({username});
        if(!candidate) throw new Error(`user ${username} has already exists`);
        const hashPassword = bcryptjs.hashSync(password, 7);
        const user = await User.create({username, password:hashPassword});
        return user.username;
    }
    async login (username, hashPassword) {
        const user = await User.findOne({username});
        if(!user) throw new Error(`user ${username} is not found`);
        const isPasswordValid = bcryptjs.compareSync(hashPassword, user.password);
        if(!isPasswordValid) throw new Error(`invalid password`);
    }
}

export default new AuthService();