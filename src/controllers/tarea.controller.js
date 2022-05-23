let _tareaService = null;

module.exports = class TareaController {
  constructor({ TareaService }) {
    _tareaService = TareaService;
  }

  async mongoGet(req, res) {
    const { id } = req.params;
    //console.log("mongogetTarea"+id);
    const tarea = await _tareaService.mongoGet(id);
    //console.log(tarea);
    return res.send(tarea);
  }
  async mongoGetTareaByIdTarea(req, res) {
    const { idTarea } = req.params;
    //console.log(idTarea);
    const tarea = await _tareaService.mongoGetTareaByIdTarea(idTarea);
    return res.send(tarea);
  }
  async mongopruebas(){
    const resi = await _tareaService.mongopruebas()
    return res.send(resi);
  }
  async mongoGetAll(req, res){
    const {pageSize, pageNum} = req.query;
    const tarea = await _tareaService.mongoGetAll(pageSize, pageNum,{ $query: {}, $orderby: { nombre : -1 } });
    return res.send(tarea);
  }

  async mongoGetTareasByIdEmpleado(req, res){
    const {pageSize, pageNum} = req.query;
    const { idEmpleado } = req.params;
    // arreglo provisional que facilita las pruebas por el id numerico
    const tarea = await _tareaService.mongoGetTareasByIdEmpleado(idEmpleado, pageSize, pageNum);
    return res.send(tarea);
  }

  async addEmpleado(req, res){
    //console.log("req");
    const { idTarea, idEmpleado } = req.query;
    //console.log(idTarea, idEmpleado);
    const flag = await _tareaService.mongoAddEmpleado(idTarea, idEmpleado);
    if(flag){
      return res.send({status:201,message:"Tarea asignada a empleado con exito"});
    }
    return res.send({status:403,message:"Algo fue mal"});
  }

  async solicitarTarea(req, res){
    const { idTarea, idEmpleado } = req.query;
    const flag = await _tareaService.mongoSolicitarTarea(idTarea, idEmpleado);
    if(flag){
      return res.send({status:201,message:"Solicitud realizada con exito"});
    }
    return res.send({status:400,message:"Algo fue mal"});
  }

  async mongoGetAllSolicitudes(req, res){
    const { pageSize, pageNum } = req.query;
    return res.send(await _tareaService.mongoGetAllSolicitudes(pageSize, pageNum));
  }
  async mongoGetSolicitud(req, res){
    const { id } = req.params;
    return res.send(await _tareaService.mongoGetSolicitud(id));
  }

  async mysqlGetAll(req, res){
    const tarea = await _tareaService.mysqlGetAll();
    return res.send(tarea);
  }
  
  async mongoCreate(req, res){
    const {body} = req;
    //console.log(body);
    if(await _tareaService.mongoCreate(body)){
      return res.send({status:201,message:"tarea creada correctamente"});
    }else{
      return res.send({status: 400, message:"parametro incorrecto"});
    }
  }

  async mongoUpdate(req, res){
    const {body} = req;
    const {id} = req.params;
    //console.log("update tarea"+id);
    const updateTarea = await _tareaService.mongoUpdate(id,body);
    //console.log(updateTarea);
    return res.send({status:202,message:"tarea actualizada correctamente"});
  }

  async mongoDelete(req,res){
    const {id} = req.params;
    const deleteTarea = await _tareaService.mongoDelete(id);
    return res.send(deleteTarea);
  }
}

