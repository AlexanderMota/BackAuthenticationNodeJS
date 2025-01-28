const BaseRepository = require('./base.repository');
const { ObjectId } = require('mongodb');

let _vehiculo = null;


module.exports = class VehiculoRepository extends BaseRepository{
    constructor({Vehiculo}){
        super(Vehiculo);
        _vehiculo = Vehiculo;
    }
    async mongoGetVehiculoByPasajero(idPasajero){

        const vehis = await _vehiculo.find({ 
            ocupantes: new ObjectId(idPasajero) 
          },{_id:0,ocupantes:0,fechaRegistro:0,propietario:0});
        //console.log("vehiculosConPlazas: "+vehiculosConPlazas);
        //console.log(vehis);
        if(!vehis){
            return {status:402,message:"Algo ha ido mal"};
        }
        return vehis;
    }
    async mongoGetVehiculoByIdPropietario(idPropietario) {
        const vehi  = await _vehiculo.find({propietario:new ObjectId(idPropietario)});
        
        if(!vehi){
            return {status:402,message:"Algo ha ido mal"};
        }
        return vehi;
    }
    async mongoGetVehiculoByMatricula(matricula) {
        const vehi  = await _vehiculo.find({matricula:matricula});
        
        if(!vehi){
            return {status:402,message:"Algo ha ido mal"};
        }
        return vehi;
    }
    async mongoGetVehiculoByIdParada(idParada){
        //console.log("idParada: "+idParada);
        const vehi  = await _vehiculo.find({ 
            puntosDestinoRecogida: {
              $elemMatch: { idParada: idParada }
            }
        });
        //console.log(vehi);
        if(!vehi){
            return {status:402,message:"Algo ha ido mal"};
        }
        return vehi;
    }
    async mongoGetVehiculoByIdDestinoConPlazasDisponibles(idDestino){
        const vehiculosConPlazas = await _vehiculo.find({ 
            puntosDestinoRecogida: {
              $elemMatch: { idDestino: idDestino }
            },
            $expr: {
              $lt: [{ $size: "$ocupantes" }, "$plazas"]
            }
          },{_id:0});
        //console.log("vehiculosConPlazas: "+vehiculosConPlazas);
        if(!vehiculosConPlazas){
            return {status:402,message:"Algo ha ido mal"};
        }
        return vehiculosConPlazas;
    }
    async mongoDeleteParada(idVehi, idParada){
        
        const val = await _vehiculo.updateOne(
            { matricula: idVehi }, 
            { $pull: { puntosDestinoRecogida: idParada } } 
        );
        //console.log(val);
        if(val){
            if(!val.acknowledged){
                return {status:403, message:"Operacion no reconocida por MongoDB."};
            }else if(val.matchedCount > 0){
                if(val.modifiedCount > 0){
                    return {status:201, message:"Se ha modificado la parada."};
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

