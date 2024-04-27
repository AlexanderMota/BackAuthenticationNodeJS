const {roles, departamentos} = require('../utils/listasEstaticas');


let _empleadoService = null;
let _tareaService = null;

module.exports = class EmpleadoController {
  constructor({ EmpleadoService, TareaService }) {
    _empleadoService = EmpleadoService;
    _tareaService = TareaService;
  }
  async mongoGetEmpleadoByIdEmpleado(req, res) {
    if(req.empleado.rol <= 2){
      const { idEmpleado } = req.params;
      const empleado = await _empleadoService.mongoGet(idEmpleado);
      const empleadoProcesado = {
        _id:empleado._id,
        nombre:empleado.nombre,
        apellidos:empleado.apellidos,
        telefono:empleado.telefono,
        email:empleado.email,
        rol:empleado.rol.nombre,
        centroTrabajo:        empleado.centroTrabajo
      }
      return res.send(empleadoProcesado);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetEmpleadosByIdTarea(req, res) {
    if(req.empleado.rol <= 2){
      const {pageSize, pageNum} = req.query;
      const { idTarea } = req.params;
      //console.log(idTarea);
      const empleados = await _empleadoService.mongoGetEmpleadosByIdTarea(idTarea, pageSize, pageNum);
      const empleadosProcesados = [];
      empleados.forEach(empleado => {
        empleadosProcesados[empleadosProcesados.length] = {
          _id:empleado._id,
          nombre:empleado.nombre,
          apellidos:empleado.apellidos,
          telefono:empleado.telefono,
          email:empleado.email,
          rol:empleado.rol.nombre,
          centroTrabajo:        empleado.centroTrabajo
        }
      });
      return res.send(empleadosProcesados);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetEmpleadosByIdTareaDist(req, res) {
    if(req.empleado.rol <= 2){
      const {pageSize, pageNum} = req.query;
      const { idTarea } = req.params;
      //console.log(idTarea);
      const empleados = await _empleadoService.mongoGetEmpleadosByIdTareaDist(idTarea, pageSize, pageNum);
      const empleadosProcesados = [];
      empleados.forEach(empleado => {
        empleadosProcesados[empleadosProcesados.length] = {
          _id:empleado._id,
          nombre:empleado.nombre,
          apellidos:empleado.apellidos,
          telefono:empleado.telefono,
          email:empleado.email,
          rol:empleado.rol.nombre,
          centroTrabajo:        empleado.centroTrabajo
        }
      });
      return res.send(empleadosProcesados);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetAll(req, res){
    if(req.empleado.rol <= 2){
      const {pageSize, pageNum} = req.query;
      //console.log(pageSize);
      const empleados = await _empleadoService.mongoGetAll(pageSize, pageNum);
      
      //console.log("empCont.mongoGetAll: "+empleados);
      const empleadosProcesados = [];
      empleados.forEach(empleado => {
        empleadosProcesados[empleadosProcesados.length] = {
          _id:empleado._id,
          nombre:empleado.nombre,
          apellidos:empleado.apellidos,
          telefono:empleado.telefono,
          email:empleado.email,
          rol:empleado.rol.nombre,
          centroTrabajo:        empleado.centroTrabajo
        }
      });
      return res.send(empleadosProcesados);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async getEmpleadosByCentro(req, res){
    console.log("getEmpleadosByCentro por implementar");
    console.log(req.empleado);
    console.log(req.params);

  }
  async getRoles(req, res){
    if(req.empleado.rol <= 2){
      //console.log("---Original: ");
      //console.log(roles);
      const ro2 = JSON.parse(JSON.stringify(roles));
      ro2.shift();
      //console.log("---sin admin: ");
      //console.log(ro2);
  
      ro2.forEach(obj => delete obj.valor);
      /*const newArray = originalArray.map(objeto => {
        const { atributoNoDeseado, ...restoAtributos } = objeto;
        return restoAtributos;
      });*/
      //console.log("---sin value: ");
      //console.log(ro2);
      return res.send(ro2);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async getDepartamentos(req, res){
    if(req.empleado.rol <= 2){
      return res.send(departamentos);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }

  async mysqlGetAll(req, res){
    if(req.empleado.rol <= 2){
      const empleados = await _empleadoService.mysqlGetAll();
      return res.send(empleados);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoAddTarea(req, res){
    if(req.empleado.rol <= 2){
      const { idTarea, idEmpleado } = req.query;
      const flag = await _tareaService.mongoAddEmpleado( idTarea, idEmpleado);
      if(flag){ 
        return res.send({200:"",message:"Empleado asignado a tarea con exito"});
      }
      return res.send({400:"",message:"Algo fue mal"});
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }

  async mongoUpdate(req, res){
    if(req.empleado.rol <= 2){
      const { body } = req;
      const { idEmpleado } = req.params;
  
      const updateEmpleado = await _empleadoService.mongoUpdate( idEmpleado, body );
      return res.send( updateEmpleado );
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }

  async mongoDelete(req,res){
    if(req.empleado.rol <= 2){
      const {idEmpleado} = req.params;
      const deletedEmpleado = await _empleadoService.mongoDelete( idEmpleado );
      return res.send(deletedEmpleado);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
}

