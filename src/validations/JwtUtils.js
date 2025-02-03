import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
export default class JWTUtils {
    static decodeToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}