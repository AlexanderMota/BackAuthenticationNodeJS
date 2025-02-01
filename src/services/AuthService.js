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

    return { token, user: { user_id: user.user_id, username: user.username, email: user.email, role: user.role_id } };
  }
}

export default AuthService;
