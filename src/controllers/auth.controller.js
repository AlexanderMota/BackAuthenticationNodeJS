let _authService = null;

module.exports = class AuthController {
  constructor({ AuthService }) {
    _authService = AuthService;
  }

  async compruebaToken(req, res){
    const {token} = req.query;
    const resToken = await _authService.compruebaToken(token);
    return res.status(201).send(resToken);
  }

  async signUp(req, res) {
    const {body} = req;
    //console.log(body);
    const createdEmpleado = await _authService.signUp(body);
    return res.status(201).send(createdEmpleado);
  }
  async signIn(req, res) {
    const {body} = req;
    const creds = await _authService.signIn(body);
    return res.send(creds);
  }
}
