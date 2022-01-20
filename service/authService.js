import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.js'

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
        const token = this.generateAccessToken(user._id, user.roles);
        return token;
    }
    generateAccessToken(id, roles) {
        const payload = {id,roles}
        return jwt.sign(payload, config.secret, {expiresIn: "24h"})
    }
}

export default new AuthService();