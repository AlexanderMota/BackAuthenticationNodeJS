import bcrypt from 'bcrypt';

export default class UserValidations {
    static validateEmail(email) {
        const allowedDomains = new Set(["com", "net", "org", "es", "edu", "io", "gov"]);
        const regex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i; // Valida formato general
        
        if (!regex.test(email)) {
            return false;
        }
        const domain = email.split('.').pop();
        
        if (!allowedDomains.has(domain.toLowerCase())) {
            return false;
        }
        return true;
    }

    static validatePasswordFormat(password) {
        return (typeof password === 'string' || password.length > 6)
    }   
    static validateComparePassword(password,userpassword) {
        return bcrypt.compareSync(password, userpassword);
    }
    static hashPassword(password) {
        return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
    }
}