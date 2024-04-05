let _vehiculoService = null;

module.exports = class UbicacionController {
  constructor({ VehiculoService }) {
    _vehiculoService = VehiculoService;
  }

  async mongoGet(req, res) {
    const { id } = req.params;
    const ubicacion = await _vehiculoService.mongoGet(id);
    return res.send(ubicacion);
  }
  async mongoCreate(req, res){
    const {body} = req;
    if(await _vehiculoService.mongoCreate(body)){
      return res.send({status:201,message:"Vehículo guardado correctamente"});
    }else{
      return res.send({status: 400, message:"parametro incorrecto"});
    }
  }
  async mongoGetAll(req, res){
    const {pageSize, pageNum} = req.query;
    const vehiculos = await _vehiculoService.mongoGetAll(pageSize, pageNum);
    
    return res.send(vehiculos);
  }
  async mongoGetVehiculoByIdPropietario(req, res){
    const { idPropietario } = req.params;
    const vehiculo = await _vehiculoService.mongoGetVehiculoByIdPropietario(idPropietario);
    return res.send(vehiculo);
  }
  async mongoGetVehiculoByMatricula(req, res){
    const { matricula } = req.params;
    const vehiculo = await _vehiculoService.mongoGetVehiculoByMatricula(matricula);
    return res.send(vehiculo);
  }
}

