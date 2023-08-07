const BaseRepository = require('./base.repository');

let _vehiculo = null;


module.exports = class VehiculoRepository extends BaseRepository{
    constructor({Vehiculo}){
        super(Vehiculo);
        this._vehiculo = Vehiculo;
    }

    async mongoGetVehiculoByIdPropietario(idPropietario/*, pageSize = 5, pageNum = 1*/) {
        //const skips = pageSize * (pageNum - 1);
        const ubi  = await _vehiculo.find({propietario:idPropietario});
        
        console.log("ids vehi: "+ubi);
        if(!ubi){
            return false;
        }
        return ubi;
    }
}

