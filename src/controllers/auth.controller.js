const {roles} = require('../utils/listasEstaticas');
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
    //delete body._id;
    //console.log("fuera > ");
    //console.log(body);
    if(body.rol.nombre){
      //console.log("dentro rol true ");
      const rol = roles.find(obj => obj.nombre === body.rol.nombre)
      if(rol){
        //console.log("dentro > ");
        //console.log(ro);
        body.rol = rol;
      }else{
        return res.status(401).send({ status: 401, message: 'El rol no es correcto.' });
      }
    }
    /*
    console.log(">>>>>>>>nuevoEmp: ");
    console.log(body);
*/
    const createdEmpleado = await _authService.signUp(body);
    //console.log("resEmp: ");
    //console.log(createdEmpleado);
    return res.status(201).send(createdEmpleado);
  }
  async signIn(req, res) {
    const {body} = req;
    const creds = await _authService.signIn(body);
    return res.send(creds);
  }
  async updatePerfil(req, res){
    const {body} = req;
    //console.log(body);
    const creds = await _authService.updatePerfil(body);
    return res.send(creds);
  }
}
