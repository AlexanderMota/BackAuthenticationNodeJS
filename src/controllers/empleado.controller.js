let _empleadoService = null;
let _tareaService = null;

module.exports = class EmpleadoController {
  constructor({ EmpleadoService, TareaService }) {
    _empleadoService = EmpleadoService;
    _tareaService = TareaService;
  }

  async mongoGet(req, res) {
    const { id } = req.params;
    const empleado = await _empleadoService.mongoGet(id);
    return res.send(empleado);
  }
  async mongoGetEmpleadoByIdEmpleado(req, res) {
    const { idEmpleado } = req.params;
    const empleado = await _empleadoService.mongoGetEmpleadoByIdEmpleado(idEmpleado);
    return res.send(empleado);
  }
  async mongoGetEmpleadosByIdTarea(req, res) {
    const {pageSize, pageNum} = req.query;
    const { idTarea } = req.params;
    //console.log(idTarea);
    const empleados = await _empleadoService.mongoGetEmpleadosByIdTarea(idTarea, pageSize, pageNum);
    return res.send(empleados);
  }
  async mongoGetAll(req, res){
    const {pageSize, pageNum} = req.query;
    //console.log(pageSize);
    const empleados = await _empleadoService.mongoGetAll(pageSize, pageNum);
    return res.send(empleados);
  }

  async mysqlGetAll(req, res){
    const empleados = await _empleadoService.mysqlGetAll();
    return res.send(empleados);
  }
  async mongoAddTarea(req, res){
    const { idTarea, idEmpleado } = req.query;
    const flag = await _tareaService.mongoAddEmpleado(idTarea, idEmpleado);
    if(flag){ 
      return res.send({200:"",message:"Empleado asignado a tarea con exito"});
    }
    return res.send({400:"",message:"Algo fue mal"});
  }

  async mongoUpdate(req, res){
    const {body} = req;
    const {idEmpleado} = req.params;

    const updateEmpleado = await _empleadoService.mongoUpdate(idEmpleado,body);
    return res.send(updateEmpleado);
  }

  async mongoDelete(req,res){
    const {idEmpleado} = req.params;
    const deletedEmpleado = await _empleadoService.mongoDelete(idEmpleado);
    return res.send(deletedEmpleado);
  }
}

