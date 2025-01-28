const {roles, departamentos} = require('../utils/listasEstaticas');


let _empleadoService = null;
let _tareaService = null;

module.exports = class EmpleadoController {
  constructor({ EmpleadoService, TareaService }) {
    _empleadoService = EmpleadoService;
    _tareaService = TareaService;
  }
  async mongoGetEmpleadoByIdEmpleado(req, res) {
    const { idEmpleado } = req.params;

    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const empleado = await _empleadoService.mongoGet(idEmpleado);
      const empleadoProcesado = {
        _id:empleado._id.toString(),
        nombre:empleado.nombre,
        apellidos:empleado.apellidos,
        telefono:empleado.telefono,
        email:empleado.email,
        rol:empleado.rol.nombre,
        centroTrabajo:empleado.centroTrabajo.toString()
      }
      return res.send(empleadoProcesado);
    }/*else if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const empleado = await _empleadoService.mongoGet(idEmpleado);
      if(req.empleado.id == empleado._id.toString()){
        const empleadoProcesado = {
          _id:empleado._id.toString(),
          nombre:empleado.nombre,
          apellidos:empleado.apellidos,
          telefono:empleado.telefono,
          email:empleado.email,
          rol:empleado.rol.nombre,
          centroTrabajo:empleado.centroTrabajo
        }
        return res.send(empleadoProcesado);
      }
    }*/
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetEmpleadosByIdTarea(req, res) {
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const {pageSize, pageNum} = req.query;
      const { idTarea } = req.params;
      const empleados = await _empleadoService.mongoGetEmpleadosByIdTarea(idTarea, pageSize, pageNum);
      const empleadosProcesados = [];
      empleados.forEach(empleado => {
        empleadosProcesados[empleadosProcesados.length] = {
          _id:empleado._id.toString(),
          nombre:empleado.nombre,
          apellidos:empleado.apellidos,
          telefono:empleado.telefono,
          email:empleado.email,
          rol:empleado.rol.nombre,
          centroTrabajo:empleado.centroTrabajo
        }
      });
      return res.send(empleadosProcesados);
    }else if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const {pageSize, pageNum} = req.query;
      const { idTarea } = req.params;
      
      const empleados = await _empleadoService.mongoGetEmpleadosByIdTarea(idTarea, pageSize, pageNum);
      return res.send({status: 201, message:empleados.length});
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetEmpleadosDisponibles(req, res) {
    if(req.empleado.rol <= 3 && req.empleado.rol >= 0){
      const {rolBuscar} = req.query;
      const { idSuper } = req.params;

      const empleados = await _empleadoService.mongoGetEmpleadosDisponibles(idSuper, rolBuscar);

      const empleadosProcesados = [];
      empleados.forEach(empleado => {
        empleadosProcesados[empleadosProcesados.length] = {
          _id:empleado._id.toString(),
          nombre:empleado.nombre,
          apellidos:empleado.apellidos,
          telefono:empleado.telefono,
          email:empleado.email,
          rol:empleado.rol.nombre,
          centroTrabajo:empleado.centroTrabajo.toString()
        }
      });
      return res.send(empleadosProcesados);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetAll(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const {pageSize, pageNum} = req.query;
      
      const empleados = await _empleadoService.mongoGetAll(pageSize, pageNum);
      
      const empleadosProcesados = [];
      empleados.forEach(empleado => {
        empleadosProcesados[empleadosProcesados.length] = {
          _id:empleado._id.toString(),
          nombre:empleado.nombre,
          apellidos:empleado.apellidos,
          telefono:empleado.telefono,
          email:empleado.email,
          rol:empleado.rol.nombre,
          centroTrabajo:empleado.centroTrabajo
        }
      });
      return res.send(empleadosProcesados);
    }else if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const empleado = await _empleadoService.mongoGet(req.empleado.id);

      const empleadoProcesado=[];
      empleadoProcesado[0] = {
        _id:empleado._id.toString(),
        nombre:empleado.nombre,
        apellidos:empleado.apellidos,
        telefono:empleado.telefono,
        email:empleado.email,
        rol:empleado.rol.nombre,
        centroTrabajo:empleado.centroTrabajo
      }
      return res.send(empleadoProcesado);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async getEmpleadosByCentro(req, res){
    console.log("getEmpleadosByCentro por implementar");
    console.log(req.empleado);
    console.log(req.params);
  }
  async getRoles(req, res){
    if(req.empleado.rol <= 3 && req.empleado.rol >= 0){
      const ro2 = JSON.parse(JSON.stringify(roles));
      ro2.shift();
      
      const ro = [];
      ro2.forEach(obj => {
        if(obj.valor >= req.empleado.rol){
          ro.push(obj.nombre);
        }
      });
      return res.send(ro);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async getDepartamentos(req, res){
    if(req.empleado.rol <= 3 && req.empleado.rol >= 0){
      const ro = [];
      departamentos.forEach(obj => {
          ro.push(obj.nombre);
      });
      return res.send(ro);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mysqlGetAll(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const empleados = await _empleadoService.mysqlGetAll();
      return res.send(empleados);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }

  async mongoUpdate(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const { body } = req;
      const { idEmpleado } = req.params;
      delete body.fechaRegistro;
      const updateEmpleado = await _empleadoService.mongoUpdate( idEmpleado, body );
      return res.send( updateEmpleado );
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }

  async mongoDelete(req,res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const {idEmpleado} = req.params;
      const deletedEmpleado = await _empleadoService.mongoDelete( idEmpleado );
      return res.send(deletedEmpleado);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
}

