let _authService = null;

module.exports = class AuthController {
  constructor({ AuthService }) {
    _authService = AuthService;
  }

  async signUp(req, res) {
    const {body} = req;
    const createdEmpleado = await _authService.signUp(body);
    return res.status(201).send(createdEmpleado);
  }
  async signIn(req, res) {
    const {body} = req;
    const creds = await _authService.signIn(body);
    return res.send(creds);
  }
}
