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
    console.log("llegamos mongoGetComentariosEst");
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const comen = await _tareaService.mongoGetComentariosEst();
      console.log(comen);
      return res.send(comen);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetComentariosEst2(req, res) {
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const { id } = req.params;
      const tarea = await _solicitudService.mongoGet(id);
      return res.send(tarea);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
}