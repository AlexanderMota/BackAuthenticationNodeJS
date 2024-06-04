const { ObjectId } = require('mongodb');
let _vehiculoService = null;
let _ubicacionService = null;

module.exports = class UbicacionController {
  constructor({ VehiculoService, UbicacionService }) {
    _vehiculoService = VehiculoService; 
    _ubicacionService = UbicacionService;
  }

  async mongoCreate(req, res){
      const {body} = req;
      console.log(body);
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      if(await _vehiculoService.mongoCreate(body)){
        return res.send({status:201,message:"Vehículo guardado correctamente"});
      }else{
        return res.send({status: 400, message:"parametro incorrecto"});
      }
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGet(req, res) {
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { id } = req.params;
      const ubicacion = await _vehiculoService.mongoGet(id);
      return res.send(ubicacion);
    }
    
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetAll(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const {pageSize, pageNum} = req.query;
      const vehiculos = await _vehiculoService.mongoGetAll(pageSize, pageNum);
      
      return res.send(vehiculos);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetVehiculoByIdPropietario(req, res){
    if(req.empleado.rol <= 2 || req.empleado.id == req.params.idPropietario){
      const vehiculo = await _vehiculoService.mongoGetVehiculoByIdPropietario(req.params.idPropietario);
      return res.send(vehiculo);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetVehiculoByMatricula(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { matricula } = req.params;
      const vehiculo = await _vehiculoService.mongoGetVehiculoByMatricula(matricula);
      return res.send(vehiculo);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetVehiculoByIdParada(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { idParada } = req.params;
      console.log(req.params);
      const vehiculo = await _vehiculoService.mongoGetVehiculoByIdParada(idParada);
      return res.send(vehiculo);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoUpdate(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { body } = req;
      
      const vehi = await _vehiculoService.mongoGetVehiculoByMatricula(body.matricula);
      
      if(vehi){
        if(vehi[0].fechaRegistro){
          delete vehi[0].fechaRegistro;
        }
        const vehiculo = await _vehiculoService.mongoUpdate(vehi[0]._id,body);
        if(vehiculo){
          return res.send({status:200,message:"vehiculo actualizado correctamente"});
        }else{
          return res.send({status:502,message:"problema al actualizar el vehiculo encontrado."});
        }
      }
      return res.send({status:502,message:"no se encontró vehiculo con la matricula especificada."});
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoUpdatePasajero(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { matricula } = req.params;
      const { pasajero } = req.query;
      console.log(matricula);
      console.log(pasajero);
      
      const vehi = await _vehiculoService.mongoGetVehiculoByMatricula(matricula);
      console.log(vehi);
  
      if(vehi[0].ocupantes){
        if (vehi[0].ocupantes.includes(new ObjectId(pasajero))) {
          return res.send({status : 405, message :'El pasajero ya esta registrado en el vehículo.'});
        }else if(vehi[0].ocupantes.length >= vehi[0].plazas) {
          return res.send({status : 406, message :'El vehículo no cuenta con plazas disponibles.'});
        }else if(vehi[0].propietario == pasajero){
          return res.send({status : 407, message :'El propietario del vehículo no necesita registrarse como pasajero.'});
        }else{
          vehi[0].ocupantes.push(new ObjectId(pasajero));
        }
      }
      const id = vehi[0]._id;
      
      delete vehi[0]._id;
      delete vehi[0].fechaRegistro;
      
      const vehiculo = await _vehiculoService.mongoUpdate(id,vehi[0]);
  
      if(vehiculo){
        return res.send({status:200,message:"pasajero registrado con exito."});
      }else{
        return res.send({status:502,message:"problema al actualizar el vehiculo encontrado."});
      }
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoDeleteVehiculo(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { idVehiculo } = req.params;
      
      const vehiculo = await _vehiculoService.mongoGet(idVehiculo);
      if(vehiculo.puntosDestinoRecogida){

        vehiculo.puntosDestinoRecogida.forEach(async idpdr => {
          const responseUbiUpd = await _ubicacionService.mongoDeleteParadaByMatricula(idpdr, vehiculo.matricula);
  
          console.log("mongoDeleteVehiculo responseUbiUpd: "+responseUbiUpd);
          const delVehi = await _vehiculoService.mongoDelete(vehiculo._id);
            console.log("mongoDeleteVehiculo delVehi: "+delVehi);
            if(delVehi){
              return res.send({status:202,message:"Vehículo eliminado correctamente."});
            }else{
              return res.send({status:203,message:"No se eliminó ningún vehículo."});
            }
        });
      }
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
}