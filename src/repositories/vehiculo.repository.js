const BaseRepository = require('./base.repository');
const { ObjectId } = require('mongodb');

let _vehiculo = null;


module.exports = class VehiculoRepository extends BaseRepository{
    constructor({Vehiculo}){
        super(Vehiculo);
        _vehiculo = Vehiculo;
    }

    async mongoGetVehiculoByIdPropietario(idPropietario/*, pageSize = 5, pageNum = 1*/) {
        //const skips = pageSize * (pageNum - 1);
        const objectId = new ObjectId(idPropietario);
        const vehi  = await _vehiculo.find({propietario:objectId});
        
        if(!vehi){
            return {status:402,message:"Algo ha ido mal"};
        }
        return vehi;
    }
    async mongoGetVehiculoByMatricula(matricula/*, pageSize = 5, pageNum = 1*/) {
        //const skips = pageSize * (pageNum - 1);
        const vehi  = await _vehiculo.find({matricula:matricula});
        
        if(!vehi){
            return {status:402,message:"Algo ha ido mal"};
        }
        return vehi;
    }
    async mongoGetVehiculoByIdParada(idParada){
        /*const vehi  = await _vehiculo.find({
            puntosDestinoRecogida: { $in: [idParada] }
        });*/
        console.log("idParada: "+idParada);
        const vehi  = await _vehiculo.find({ 
            puntosDestinoRecogida: {
              $elemMatch: { idParada: idParada }
            }
        });
        console.log(vehi);
        if(!vehi){
            return {status:402,message:"Algo ha ido mal"};
        }
        return vehi;
    }
    async mongoGetVehiculoByIdDestinoConPlazasDisponibles(idDestino){
        /*const vehi  = await _vehiculo.find({
            puntosDestinoRecogida: { $in: [idParada] }
        });*/
        const vehiculosConPlazas = await _vehiculo.find({ 
            puntosDestinoRecogida: {
              $elemMatch: { idDestino: idDestino }
            },
            $expr: {
              $lt: [{ $size: "$ocupantes" }, "$plazas"]
            }
          },{_id:0});
        console.log("vehiculosConPlazas: "+vehiculosConPlazas);
        if(!vehiculosConPlazas){
            return {status:402,message:"Algo ha ido mal"};
        }
        return vehiculosConPlazas;
    }
    async mongoDeleteParada(idVehi, idParada){
        
        const val = await _vehiculo.updateOne(
            { matricula: idVehi }, // Filtro para encontrar el documento
            { $pull: { puntosDestinoRecogida: idParada } } // Eliminar el elemento del array
        );
        console.log(val);
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

