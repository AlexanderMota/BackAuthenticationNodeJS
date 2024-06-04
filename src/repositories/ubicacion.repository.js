const BaseRepository = require('./base.repository');
const { ObjectId } = require('mongodb');

let _ubicacion = null;
let _tareaHasSubtareas = null;
let _empleado = null;
let _vehiculoRep = null;


module.exports = class UbicacionRepository extends BaseRepository{
  constructor({Ubicacion, TareaHasSubtareas, Empleado, VehiculoRepository}){
      super(Ubicacion);
      _ubicacion = Ubicacion;
      _tareaHasSubtareas = TareaHasSubtareas;
      _empleado = Empleado;
      _vehiculoRep = VehiculoRepository;
  }
  async mongoGetUbicacionByIdTarea(idTar) {
      let idt = {idTarea:idTar};
      let ubi = [];
      while (ubi.length < 1 && idt != null) {
        ubi  = await _ubicacion.find({idTarea:idt.idTarea});

        idt = await _tareaHasSubtareas.findOne({idSubtarea:idt.idTarea},{_id:0,idTarea:1});
      }
      if(ubi.length < 1) return {status:402,message:"No se encontró ubicación para esta tarea ni para sus tareas principales."};
      return ubi;
  }
  async mongoGetUbicacionByIdTarea2(idTarea) {
      const ubi  = await _ubicacion.find({idTarea:idTarea});
      
      /*if(!ubi.length){
          console.log("sin ubi: "+ubi);
          const res = await _tareaHasSubtareas.findOne({idSubtarea:idTarea},{_id:0,idTarea:1});

          return await _ubicacion.find({idTarea:res.idTarea});
      }*/
      return ubi;
  }
  async mongoGetParada(idUbi, pageSize=5, pageNum=1) {
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    // probar esta funcion con un vehiculo lleno, no deberia devolverlo
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    const vehiculosConPlazas = await _vehiculoRep.mongoGetVehiculoByIdDestinoConPlazasDisponibles(idUbi);
    
    const idsUbiParadas = vehiculosConPlazas.reduce((ids = [], vehiculo) => {
      vehiculo.puntosDestinoRecogida.forEach(id => {
        if(id.idDestino == idUbi) ids.add(id.idParada);
      });
      return ids;
    }, new Set());
    
    const ubiParadas = await _ubicacion.find({
      _id: { $in: [...idsUbiParadas] }
    });
    console.log(ubiParadas);

    return ubiParadas;
  } 
  async mongoDeleteParadaByMatricula(idUbi, matricula){
    const val = await _ubicacion.updateOne(
      { _id: ObjectId(idUbi) }, 
      { $pull: { fechasRecogida: { vehiculo: matricula } } } 
    );
    if(val){
      if(!val.acknowledged){
        return {status:403, message:"Operacion no reconocida por MongoDB."};
      }else if(val.matchedCount > 0){
        if(val.modifiedCount > 0){
          return {status:202, message:"Se ha modificado el documento."};
        }else{
          return {status:202, message:"Se encontraron coincidencias pero no se ha modificado el documento."};
        }
      }else if(!val.matchedCount < 1){
        return {status:203, message:"Operacion realizada correctamente. No se encontraron coincidencias con el id de la parada."};
      }
    }else{
      return {status:408, message:"Error desconocido."};
    }
  }
}
