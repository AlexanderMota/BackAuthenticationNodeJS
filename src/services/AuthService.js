import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
class AuthService {
  constructor({ UserRepository, UserValidations }) {
    this.UserRepository = UserRepository;
    this.UserVals = UserValidations;
  }

  async register(email, password, name, lastname, username , phone, avatar_url, role_id) {
    if (!this.UserVals.validateEmail(email)) throw new Error('Formato email incorrecto');
    if (!this.UserVals.validatePasswordFormat(password)) throw new Error('Formato password incorrecto');
    const hashedPassword = this.UserVals.hashPassword(password);
    const user_id = crypto.randomUUID();
    console.log(user_id);
    const resp = await this.UserRepository.createUser(email, hashedPassword, user_id, name, lastname, username , phone, avatar_url, role_id);
    console.log(resp);
    return resp;
  }
  async login(email, password) {
    if (!this.UserVals.validateEmail(email)) throw new Error('Formato email incorrecto');
    const userres = await this.UserRepository.findByEmail(email);
    if (!userres) throw new Error('Usuario no encontrado');

    if (!this.UserVals.validateComparePassword(password, userres.password)) throw new Error('Contraseña incorrecta');

    // Generar JWT
    const token = jwt.sign(
      { user_id: userres.user_id, email: userres.email, role: userres.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );
    delete userres.password;
    delete userres.role_id;
    return { token, userres, code:200,message:"Login exitoso" };
  }
}

export default AuthService;
