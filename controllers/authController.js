import authService from "../service/authService.js";
import {validationResult} from "express-validator";


class AuthController {
    async registration (req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) return res.status(400).json('registration error', ...errors)
            const {username, password} = req.body;
            const newUsername = await authService.registration(username, password);
            res.json({message:`user ${newUsername} successfully registered`});
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    async login (req, res) {
        try {
            const errors = validationResult(req);
            const {username, password} = req.body;
            if(!errors.isEmpty()) res.status(400).json('registration error', ...errors);
            const token = await authService.login(username, password);
            res.json({token})
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    getUsers (req, res) {
        try {

        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new AuthController();