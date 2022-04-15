let _tareaService = null;
//let _empleadoService = null;

module.exports = class TareaController {
  constructor({ TareaService, EmpleadoService }) {
    _tareaService = TareaService;
    //_empleadoService = EmpleadoService;
  }

  async mongoGet(req, res) {
    const { idTarea } = req.params;
    const tarea = await _tareaService.mongoGet(idTarea);
    return res.send(tarea);
  }

  async mongoGetAll(req, res){
    const {pageSize, pageNum} = req.query;
    const tarea = await _tareaService.mongoGetAll(pageSize, pageNum);
    return res.send(tarea);
  }

  async mongoGetTareasByIdEmpleado(req, res){
    const {pageSize, pageNum} = req.query;
    const { idEmpleado } = req.params;
    // arreglo provisional que facilita las pruebas por el id numerico
    const tarea = await _tareaService.mongoGetTareasByIdEmpleado(idEmpleado, pageSize, pageNum);
    return res.send(tarea);
  }

  async mongoAddEmpleado(req, res){
    const { idTarea, idEmpleado } = req.query;
    const flag = await _tareaService.mongoAddEmpleado(idTarea, idEmpleado);
    if(flag){
      return res.send({200:"",message:"Tarea asignada a empleado con exito"});
    }
    return res.send({400:"",message:"Algo fue mal"});
  }

  async mysqlGetAll(req, res){
    const tarea = await _tareaService.mysqlGetAll();
    return res.send(tarea);
  }
  
  async mongoCreate(req, res){
    const {body} = req;
    const tarea = await _tareaService.mongoCreate(body);
    return res.send(tarea);
  }

  async mongoUpdate(req, res){
    const {body} = req;
    const {idTarea} = req.params;
    const updateTarea = await _tareaService.mongoUpdate(idTarea,body);
    return res.send(updateTarea);
  }

  async mongoDelete(req,res){
    const {idTarea} = req.params;
    const deleteTarea = await _tareaService.mongoDelete(idTarea);
    return res.send(deleteTarea);
  }
}

