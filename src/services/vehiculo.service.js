const BaseService = require('./base.service');
const mydb = require('../repositories/mysql');

let _vehiculoRep = null;

module.exports = class VehiculoService extends BaseService{
    constructor({VehiculoRepository}){
        super(VehiculoRepository);
        _vehiculoRep = VehiculoRepository;
    }
    async mongoGetVehiculoByPasajero(idPasajero){
        return await _vehiculoRep.mongoGetVehiculoByPasajero(idPasajero);
    }
    async mongoGetVehiculoByIdPropietario(idProp){
        return await _vehiculoRep.mongoGetVehiculoByIdPropietario(idProp);
    }
    async mongoGetVehiculoByMatricula(matricula){
        return await _vehiculoRep.mongoGetVehiculoByMatricula(matricula);
    }
    async mongoGetVehiculoByIdParada(idParada){
        return await _vehiculoRep.mongoGetVehiculoByIdParada(idParada);
    }
    async mongoDeleteParada(idVehi, idParada){
        return await _vehiculoRep.mongoDeleteParada(idVehi, idParada);
    }
}