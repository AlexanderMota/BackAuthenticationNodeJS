let _solicitudService = null;
let _tareaService = null;
let _empleadoService = null;

module.exports = class SolicitudController {
  constructor({ SolicitudService, TareaService, EmpleadoService }) {
    _solicitudService = SolicitudService;
    _tareaService = TareaService;
    _empleadoService = EmpleadoService;
  }

  async mongoGet(req, res) {
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { id } = req.params;
      const tarea = await _solicitudService.mongoGet(id);
      return res.send(tarea);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }

  async mongoCreate(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { idTarea, idEmpleado } = req.body;
      
      const flag = await _solicitudService.mongoSolicitarTarea(idTarea, idEmpleado);
      if(flag){
        return res.send({status:201,message:"Solicitud realizada con exito."});
      } return res.send({status:400,message:"Algo ha salido mal."});
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetAll(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const { pageSize, pageNum } = req.query;
      return res.send(await _solicitudService.mongoGetAll(pageSize, pageNum));
    }else if(req.empleado.rol <= 4){
      const solis = await _solicitudService.mongoGetSolicitudesByEmpleado(req.empleado.id);
      console.log(solis);
      return res.send(solis);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetAllSolicitudes(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const { pageSize, pageNum } = req.query;
      return res.send(await _solicitudService.mongoGetAllSolicitudes(pageSize, pageNum));
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetSolicitud(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { id } = req.params;
      return res.send(await _solicitudService.mongoGetSolicitud(id));
      
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoDeteleSolicitud(req,res){
    if(req.empleado.rol <= 4){
      const {id} = req.params;
      const deleteSolicitud = await _solicitudService.mongoDeteleSolicitud(id);
      return res.send(deleteSolicitud);
      
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
}

