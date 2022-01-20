import jwt from 'jsonwebtoken';
import config from "../config.js";


function authMiddleware(req, res, next) {
    // next() это следующее middleware
    // здесь мы иключаем прохождение запроса через этот метод в случае запроса
    // типа 'options' и вызываем следующий middleware
    if(req.method === 'OPTIONS') {
        next();
    }
    try {
        // получаем ключ из заголовка запроса 'authorization' кодовую часть строки
        const token = req.headers.authorization.split(' ')[1];
        // если ключа не получаем, отвечаем что пользователь не авторизован
        if(!token) return res.status(403).json({message:'user is not authorized'});
        // расшифровываем payload(полезные данные) при помощи секретного ключа
        const decodedData = jwt.verify(token, config.secret);
        req.user = decodedData;
        next();
    } catch (e) {
        res.status(403).json({message: 'user is not athorized'});
    }
}

export default authMiddleware;