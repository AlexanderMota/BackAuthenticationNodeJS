const BaseService = require('./base.service');
const mydb = require('../repositories/mysql');

let _vehiculoRep = null;

module.exports = class VehiculoService extends BaseService{
    constructor({VehiculoRepository}){
        super(VehiculoRepository);
        _vehiculoRep = VehiculoRepository;
    }

    async mongoGetVehiculoByIdPropietario(idProp){
        return await _vehiculoRep.mongoGetVehiculoByIdPropietario(idProp);
    }
    async mongoGetVehiculoByMatricula(matricula){
        return await _vehiculoRep.mongoGetVehiculoByMatricula(matricula);
    }
}