
const { ObjectId } = require('mongodb');
const Vehiculo = require('../models/vehiculo.mongo');
let _ubicacionService = null;
let _vehiculoService = null;

module.exports = class UbicacionController {
  constructor({ UbicacionService, VehiculoService }) {
    _ubicacionService = UbicacionService;
    _vehiculoService = VehiculoService;
  }

  async mongoCreate(req, res){
    
    if(req.empleado.rol <= 3 && req.empleado.rol >= 0){
      const {body} = req;
      if(body.idTarea){
        const ubiTar = await _ubicacionService.mongoGetUbicacionByIdTarea2(body.idTarea);
        if(ubiTar.length > 0){

          ubiTar.forEach(async val => {
            /*const ubiDel = */await _ubicacionService.mongoDelete(val._id);
            //console.log(ubiDel);
          });
          //return res.send({status:405,message:"el centro ya cuenta con una ubicacion"});
        }
      }
      if(await _ubicacionService.mongoCreate(body)){
        return res.send({status:201,message:"ubicación guardada correctamente."});
      }else{
        return res.send({status: 400, message:"parametro incorrecto."});
      }
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGet(req, res) {
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { id } = req.params;
      const ubicacion = await _ubicacionService.mongoGet(id);
      return res.send(ubicacion);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetAll(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const {pageSize, pageNum} = req.query;
      const ubicaciones = await _ubicacionService.mongoGetAll(pageSize, pageNum);
      return res.send(ubicaciones);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetUbicacionByIdTarea(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { idTarea } = req.params;
      const ubicaciones = await _ubicacionService.mongoGetUbicacionByIdTarea(idTarea);
      return res.send(ubicaciones);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetParada(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { idUbi } = req.params;
      //console.log(idUbi);
      const ubicaciones = await _ubicacionService.mongoGetParada(idUbi);
      return res.send(ubicaciones);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  
  async mongoGetParadasByIdPasajero(req, res){
    //console.log("llegamos");
    if (req.empleado.rol <= 2 || req.empleado.id == req.params.idPasajero) {
      try {
        const vehi = await _vehiculoService.mongoGetVehiculoByPasajero(req.params.idPasajero);
        let vehiPros = [];
        
        for (let i = 0; i < vehi.length; i++) {
          let val = vehi[i];
          vehiPros[i] = {vehiculo: new Vehiculo({
            matricula: val.matricula,
            plazas: val.plazas,
            descripcion: val.descripcion,
          }),paradas:[]};
  
          for (let val2 of val.puntosDestinoRecogida) {
            const res = await _ubicacionService.mongoGet(new ObjectId(val2.idParada));
            vehiPros[i].paradas.push(res);
          }
        }
        //console.log(vehiPros);
        
        return res.send(vehiPros);
      } catch (error) {
        console.error('Error al obtener paradas por idPasajero:', error);
        return res.send({ status: 500, message: 'Error interno del servidor' });
      }
    } 
    return res.send({ status: 407, message: 'Usuario no autorizado.' });
    
  }
  async mongoCreateParada(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { body } = req;
      const { destino } = req.params;
      
      const vehi = await _vehiculoService.mongoGetVehiculoByMatricula(body.fechasRecogida[0].vehiculo);
      
      const ubicaciones = await _ubicacionService.mongoGetUbicacionByIdTarea(destino);
      
      if(vehi[0]){
        const resUbi = await _ubicacionService.mongoCreate(body);
  
        if(resUbi){
          vehi[0].puntosDestinoRecogida.push({
            idParada:resUbi._id.toString(),
            idDestino:ubicaciones[0]._id.toString()
          });
          
          if(await _vehiculoService.mongoUpdate(vehi[0]._id,vehi[0])){
            return res.send({status:201,message:"Parada guardada correctamente."});
          }else{
            return res.send({status: 400, message:"problema al guardar la parada en el vehiculo."});
          }
        }else{
          return res.send({status: 400, message:"parametro incorrecto."});
        }
      }
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoAgregaParada(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      try {
        // Obtener la ubicación
        const dataUs = req.params.idParada.split('_');
        //console.log(dataUs);
        const ubicacion = await _ubicacionService.mongoGet(dataUs[0]);

        // Verificar si la ubicación tiene el atributo fechasRecogida y si es un array
        if (Array.isArray(ubicacion.fechasRecogida)) {

            // Verificar si la nueva fechaRecogida ya existe en el array
            const existeFechaRecogida = ubicacion.fechasRecogida.some((fechaRecogida) => {
                return fechaRecogida.fechaInicio === req.body.fechaInicio &&
                      fechaRecogida.fechaFin === req.body.fechaFin &&
                      fechaRecogida.vehiculo === req.body.vehiculo;
            });

            // Si la fechaRecogida ya existe, devolver un error
            if (existeFechaRecogida) return res.send({status:202,message:"La fecha de recogida ya existe."});
            
            ubicacion.fechasRecogida.push(req.body);

            const idUbi = ubicacion._id;
            delete ubicacion._id; 
            await _ubicacionService.mongoUpdate(idUbi, ubicacion);

            let resss = "";
            if(req.body.vehiculo.length < 1){
              resss ="No se ha especificado un vehículo que se haga cargo de esta parada.";
            }else{
              const vehi = await _vehiculoService.mongoGetVehiculoByMatricula(req.body.vehiculo);
              vehi[0].puntosDestinoRecogida.push({
                idParada:idUbi._id.toString(),
                idDestino:dataUs[1]
              });
              if(await _vehiculoService.mongoUpdate(vehi[0]._id,vehi[0])){
                resss= "Parada guardada correctamente.";
              }else{
                resss= "problema al guardar la parada en el vehiculo.";
              }
            }
            return res.send({status:200,message:"Fecha de recogida añadida con éxito. "+resss});
        } else {
            return res.send({status:203,message:"La ubicación no tiene fechas de recogida válidas. "+resss});
        }
      } catch (error) {
          console.error("Error al añadir fecha de recogida:", error);
          //return res.status(500).json({ message: "Error interno del servidor." });
          return res.send({status:500,message:"Error interno del servidor."});
      }
    }
    
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoUpdate(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      delete req.body.fechaRegistro;
      console.log(req.body);
      const val = await _ubicacionService.mongoUpdate(req.params, req.body);
      if(val){
        if(!val.acknowledged){
          return res.send({status:403, message:"Operacion no reconocida por MongoDB."});
        }else if(val.matchedCount > 0){
          if(val.modifiedCount > 0){
            return res.send({status:202, message:"Se ha modificado el documento."});
          }else{
            return res.send({status:202, message:"Se encontraron coincidencias pero no se ha modificado el documento."});
          }
        }else if(!val.matchedCount < 1){
          return res.send({status:203, message:"Operacion realizada correctamente. No se encontraron coincidencias con el id de la parada."});
        }
      }else{
        return res.send({status:408, message:"Error desconocido."});
      }
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoDeleteParada(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const ubicacion = await _ubicacionService.mongoGet(req.params.idParada);
      const viejasFechas = ubicacion.fechasRecogida;
      if (Array.isArray(ubicacion.fechasRecogida)) {
        ubicacion.fechasRecogida = ubicacion.fechasRecogida.filter((elemento) => {
          return elemento.fechaInicio !== req.body.fechaInicio &&
                 elemento.fechaFin !== req.body.fechaFin &&
                 elemento.vehiculo !== req.body.vehiculo;
        });
      }
      if(viejasFechas.length > ubicacion.fechasRecogida.length){
        const resvehi = await _vehiculoService.mongoDeleteParada(req.body.vehiculo,req.params.idParada);
        const idUbi = ubicacion._id;
        delete ubicacion._id;
        const val = await _ubicacionService.mongoUpdate(idUbi, ubicacion);
        return res.send(resvehi);

      }else if(ubicacion.fechasRecogida.length < 1){
        await _vehiculoService.mongoDeleteParada(req.body.vehiculo,req.params.idParada);

        await _ubicacionService.mongoDelete(ubicacion._id);

        return res.send({status:210,message:"Se eliminó la ubicación por no tener paradas."});
      }
      return res.send({status:410,message:"No se eliminó ninguna parada."});
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  
  async mongoDeleteUbiParada(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const ubicacion = await _ubicacionService.mongoGet(req.params.idParada);
      console.log(ubicacion);
    }
  }
}