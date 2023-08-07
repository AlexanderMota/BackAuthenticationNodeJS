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
    const empleado = await _empleadoService.mongoGet(idEmpleado);
    return res.send(empleado);
  }
  async mongoGetEmpleadosByIdTarea(req, res) {
    const {pageSize, pageNum} = req.query;
    const { idTarea } = req.params;
    //console.log(idTarea);
    const empleados = await _empleadoService.mongoGetEmpleadosByIdTarea(idTarea, pageSize, pageNum);
    return res.send(empleados);
  }
  async mongoGetEmpleadosByIdTareaDist(req, res) {
    const {pageSize, pageNum} = req.query;
    const { idTarea } = req.params;
    //console.log(idTarea);
    const empleados = await _empleadoService.mongoGetEmpleadosByIdTareaDist(idTarea, pageSize, pageNum);
    return res.send(empleados);
  }
  async mongoGetAll(req, res){
    const {pageSize, pageNum} = req.query;
    //console.log(pageSize);
    const empleados = await _empleadoService.mongoGetAll(pageSize, pageNum);
    
    //console.log("empCont.mongoGetAll: "+empleados);
    return res.send(empleados);
  }
  async getRoles(req, res){
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
  async getDepartamentos(req, res){
    return res.send(departamentos);
  }

  async mysqlGetAll(req, res){
    const empleados = await _empleadoService.mysqlGetAll();
    return res.send(empleados);
  }
  async mongoAddTarea(req, res){
    const { idTarea, idEmpleado } = req.query;
    const flag = await _tareaService.mongoAddEmpleado( idTarea, idEmpleado);
    if(flag){ 
      return res.send({200:"",message:"Empleado asignado a tarea con exito"});
    }
    return res.send({400:"",message:"Algo fue mal"});
  }

  async mongoUpdate(req, res){
    const { body } = req;
    const { idEmpleado } = req.params;

    const updateEmpleado = await _empleadoService.mongoUpdate( idEmpleado, body );
    return res.send( updateEmpleado );
  }

  async mongoDelete(req,res){
    const {idEmpleado} = req.params;
    const deletedEmpleado = await _empleadoService.mongoDelete( idEmpleado );
    return res.send(deletedEmpleado);
  }
}

