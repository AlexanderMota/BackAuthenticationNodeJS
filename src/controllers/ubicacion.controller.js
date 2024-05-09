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
      //console.log(body);
      if(await _ubicacionService.mongoCreate(body)){
        return res.send({status:201,message:"ubicación guardada correctamente."});
      }else{
        return res.send({status: 400, message:"parametro incorrecto."});
      }
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoCreateByIdTarea(req, res){
    if(req.empleado.rol <= 3 && req.empleado.rol >= 0){
      const { idTarea } = req.params;
      const {body} = req;
      body.idTarea = idTarea;
      if(await _ubicacionService.mongoCreate(body)){
        return res.send({status:201,message:"Ubicación guardada correctamente."});
      }else{
        return res.send({status: 400, message:"parametro incorrecto"});
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
      //console.log(pageSize);
      const ubicaciones = await _ubicacionService.mongoGetAll(pageSize, pageNum);
      return res.send(ubicaciones);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetUbicacionByIdTarea(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { idTarea } = req.params;
      //console.log(idTarea);
      const ubicaciones = await _ubicacionService.mongoGetUbicacionByIdTarea(idTarea);
      //console.log(ubicaciones);
      return res.send(ubicaciones);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetParada(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { idSuper } = req.params;
      console.log(idSuper);
      const ubicaciones = await _ubicacionService.mongoGetParada(idSuper);
      //console.log(ubicaciones);
      return res.send(ubicaciones);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoCreateParada(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
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
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoUpdate(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){

      //console.log(req.params);
      //console.log(req.body);
      const val = await _ubicacionService.mongoUpdate(req.params, req.body);
      //console.log(val);
      /*const updateEmpleado = await _empleadoService.mongoUpdate(idEmpleado,body);
      return res.send(updateEmpleado);*/
  
      /*return res.send({
        "status": 200,
        "message": "recibido"
      });*/
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
        //console.log("detecta las fechas en la ubi");
        // Filtra el array "fechasRecogida" para eliminar el elemento que coincida con "elementoAEliminar"
        ubicacion.fechasRecogida = ubicacion.fechasRecogida.filter((elemento) => {
          // Compara cada propiedad del elemento con las propiedades del elemento a eliminar
          return elemento.fechaInicio !== req.body.fechaInicio &&
                 elemento.fechaFin !== req.body.fechaFin &&
                 elemento.vehiculo !== req.body.vehiculo;
        });
      }
      //if(viejasFechas.length > ubicacion.fechasRecogida.length){
        //console.log(ubicacion);
        //console.log(req.params);
        const vehi = await _vehiculoService.mongoDeleteParada(req.body.vehiculo,req.params.idParada);
        //console.log(vehi);
        const idUbi = ubicacion._id;
        delete ubicacion._id;
        const val = await _ubicacionService.mongoUpdate(idUbi, ubicacion);
        console.log(val);
        return res.send(vehi);

      //}
        //return res.send({status:410,message:"No se eliminó ninguna parada."});
      
    }

    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoAgregaParada(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      try {
        if(req.body.vehiculo.length < 1){
          return res.send({status:405,message:"No se ha especificado un vehículo que se haga cargo de esta parada."});
        }
        // Obtener la ubicación
        const ubicacion = await _ubicacionService.mongoGet(req.params.idParada);
        //console.log(ubicacion.fechasRecogida.length);

        // Verificar si la ubicación tiene el atributo fechasRecogida y si es un array
        if (Array.isArray(ubicacion.fechasRecogida)) {

            // Verificar si la nueva fechaRecogida ya existe en el array
            const existeFechaRecogida = ubicacion.fechasRecogida.some((fechaRecogida) => {
                return fechaRecogida.fechaInicio === req.body.fechaInicio &&
                      fechaRecogida.fechaFin === req.body.fechaFin &&
                      fechaRecogida.vehiculo === req.body.vehiculo;
            });

            // Si la fechaRecogida ya existe, devolver un error
            if (existeFechaRecogida) {
                //return res.status(400).json({ message: "La fecha de recogida ya existe" });
                return res.send({status:202,message:"La fecha de recogida ya existe."});
            }

            // Añadir la nueva fechaRecogida al array existente
            ubicacion.fechasRecogida.push(req.body);

            //console.log(ubicacion.fechasRecogida.length);
            // Actualizar la ubicación en la base de datos

            const idUbi = ubicacion._id;
            delete ubicacion._id; 
            await _ubicacionService.mongoUpdate(idUbi, ubicacion);

            // Respuesta exitosa
            //return res.status(200).json({ message: "Fecha de recogida añadida con éxito" });
            return res.send({status:200,message:"Fecha de recogida añadida con éxito."});
        } else {
            // Si la ubicación no tiene el atributo fechasRecogida o no es un array, devolver un error
            //return res.status(400).json({ message: "La ubicación no tiene fechas de recogida válidas" });
            return res.send({status:203,message:"La ubicación no tiene fechas de recogida válidas."});
        }
      } catch (error) {
          // Manejo de errores
          console.error("Error al añadir fecha de recogida:", error);
          //return res.status(500).json({ message: "Error interno del servidor." });
          return res.send({status:500,message:"Error interno del servidor."});
      }
    }
    
    return res.send({status:407,message:"Usuario no autorizado."});
  }
}

