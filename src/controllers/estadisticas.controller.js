let _solicitudService = null;
let _tareaService = null;
let _empleadoService = null;

module.exports = class EstadisticasController {
  constructor({ SolicitudService, TareaService, EmpleadoService }) {
    _solicitudService = SolicitudService;
    _tareaService = TareaService;
    _empleadoService = EmpleadoService;
  }

  async mongoGetComentariosEst(req, res) {
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const comen = await _tareaService.mongoGetComentariosEst();
      return res.send(comen);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetEmpleadosEst(req, res) {
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const emps = await _empleadoService.mongoGetEmpleadosEst();
      return res.send(emps);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  /*async mongoGetSolicitudesEst(req, res) {
    console.log("solis");
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const solis = await _solicitudService.mongoGetSolicitudesEst();
      console.log(solis);
      return res.send(solis);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }*/
  async mongoGetTareasEst(req, res) {
    //console.log("taras");
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const taras = await _tareaService.mongoGetTareasEst();
      //console.log(taras);
      return res.send(taras);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
}