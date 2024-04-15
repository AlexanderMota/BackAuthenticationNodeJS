let _ubicacionService = null;
let _vehiculoService = null;

module.exports = class UbicacionController {
  constructor({ UbicacionService, VehiculoService }) {
    _ubicacionService = UbicacionService;
    _vehiculoService = VehiculoService;
  }

  async mongoCreate(req, res){
    const {body} = req;
    //console.log(body);
    if(await _ubicacionService.mongoCreate(body)){
      return res.send({status:201,message:"ubicación guardada correctamente."});
    }else{
      return res.send({status: 400, message:"parametro incorrecto."});
    }
  }
  async mongoCreateByIdTarea(req, res){
    const { idTarea } = req.params;
    const {body} = req;
    body.idTarea = idTarea;
    if(await _ubicacionService.mongoCreate(body)){
      return res.send({status:201,message:"Ubicación guardada correctamente."});
    }else{
      return res.send({status: 400, message:"parametro incorrecto"});
    }
  }
  async mongoGet(req, res) {
    const { id } = req.params;
    const ubicacion = await _ubicacionService.mongoGet(id);
    return res.send(ubicacion);
  }
  async mongoGetAll(req, res){
    const {pageSize, pageNum} = req.query;
    //console.log(pageSize);
    const ubicaciones = await _ubicacionService.mongoGetAll(pageSize, pageNum);
    return res.send(ubicaciones);
  }
  async mongoGetUbicacionByIdTarea(req, res){
    const { idTarea } = req.params;
    const ubicaciones = await _ubicacionService.mongoGetUbicacionByIdTarea(idTarea);
    //console.log(ubicaciones);
    return res.send(ubicaciones);
  }
  async mongoGetParada(req, res){
    const { idSuper } = req.params;
    const ubicaciones = await _ubicacionService.mongoGetParada(idSuper);
    //console.log(ubicaciones);
    return res.send(ubicaciones);
  }
  async mongoCreateParada(req, res){
    const {body} = req;
    const vehi = await _vehiculoService.mongoGetVehiculoByMatricula(body.fechasRecogida[0].vehiculo);
    
    if(vehi[0]){
      const resUbi = await _ubicacionService.mongoCreate(body);

      if(resUbi){
        vehi[0].puntosDestinoRecogida.push(resUbi._id.toString());
        
        if(await _vehiculoService.mongoUpdate(vehi[0]._id/*idvehi*/,vehi[0])){
          return res.send({status:201,message:"Parada guardada correctamente."});
        }else{
          return res.send({status: 400, message:"problema al guardar la parada en el vehiculo."});
        }
      }else{
        return res.send({status: 400, message:"parametro incorrecto."});
      }
    }
    
  }
  async mongoUpdate(req, res){

    const respuesta = await _ubicacionService.mongoUpdate(req.params, req.body);
    console.log("mongoUpdate: "+respuesta);
    /*console.log(req.params);
    const updateEmpleado = await _empleadoService.mongoUpdate(idEmpleado,body);
    return res.send(updateEmpleado);*/

    return res.send({
      "status": 200,
      "message": "recibido"
    });
  }
  /*async mongoGetEmpleadoByIdEmpleado(req, res) {
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

  async mongoDelete(req,res){
    const {idEmpleado} = req.params;
    const deletedEmpleado = await _empleadoService.mongoDelete(idEmpleado);
    return res.send(deletedEmpleado);
  }*/
}

