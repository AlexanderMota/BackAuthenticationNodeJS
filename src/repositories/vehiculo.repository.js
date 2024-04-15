const BaseRepository = require('./base.repository');

let _vehiculo = null;


module.exports = class VehiculoRepository extends BaseRepository{
    constructor({Vehiculo}){
        super(Vehiculo);
        _vehiculo = Vehiculo;
    }

    async mongoGetVehiculoByIdPropietario(idPropietario/*, pageSize = 5, pageNum = 1*/) {
        //const skips = pageSize * (pageNum - 1);
        const vehi  = await _vehiculo.find({propietario:idPropietario});
        
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
        console.log(idParada);
        const vehi  = await _vehiculo.find({
            puntosDestinoRecogida: { $in: [idParada] }
        });
        if(!vehi){
            return {status:402,message:"Algo ha ido mal"};
        }
        return vehi;
    }
}

