const {roles} = require('../utils/listasEstaticas');
let _authService = null;
let _empServ = null;

module.exports = class AuthController {
  constructor({ AuthService, EmpleadoService }) {
    _authService = AuthService;
    _empServ = EmpleadoService;
  }

  async compruebaToken(req, res){
    const {token} = req.query;
    const resToken = await _authService.compruebaToken(token);
    return res.status(201).send(resToken);
  }

  async signUp(req, res) {
    const {body} = req;
    
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      if(body.rol){
        const rol = roles.find(obj => obj.nombre === body.rol)
        body.rol = rol;
        if(rol){
        }else{
          return res.status(401).send({ status: 401, message: 'El rol no es correcto.' });
        }
      }
     
      const createdEmpleado = await _authService.signUp(body);
      return res.status(201).send(createdEmpleado);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async signIn(req, res) {
    const {body} = req;
    const creds = await _authService.signIn(body);
    return res.send(creds);
  }
  async getMiPerfil(req, res){
    const {mail} = req.params;
    const perfil = await _empServ.mongoGetEmpleadoByEmail(mail);
    if(req.empleado.rol <= 2 || perfil._id.toString() == req.empleado.id){
      const empleadoProcesado = {
        _id:perfil._id.toString(),
        nombre:perfil.nombre,
        apellidos:perfil.apellidos,
        telefono:perfil.telefono,
        email:perfil.email,
        rol:perfil.rol.nombre,
        centroTrabajo:perfil.centroTrabajo.toString()
      }
      return res.send(empleadoProcesado);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async updatePerfil(req, res){
    const {body} = req;
    const creds = await _authService.updatePerfil(body);
    return res.send(creds);
  }
}
