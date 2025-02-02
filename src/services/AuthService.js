import jwt from 'jsonwebtoken';
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
    const resp = await this.UserRepository.createUser(email, hashedPassword, name, lastname, username , phone, avatar_url, role_id);
    console.log(resp);
    return resp;
  }
  async login(email, password) {
    if (!this.UserVals.validateEmail(email)) throw new Error('Formato email incorrecto');
    const user = await this.UserRepository.findByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    if (!this.UserVals.validateComparePassword(password, user.password)) throw new Error('Contraseña incorrecta');

    // Generar JWT
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );
    delete user.password;
    delete user.role_id;
    delete user.user_id;
    return { token, user, code:200,message:"Login exitoso" };
  }
}

export default AuthService;
