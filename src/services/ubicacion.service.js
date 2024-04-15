const BaseService = require('./base.service');
const mydb = require('../repositories/mysql');

let _ubicacionRep = null;

module.exports = class UbicacionService extends BaseService{
    constructor({UbicacionRepository}){
        super(UbicacionRepository);
        _ubicacionRep = UbicacionRepository;
    }
    async mongoGetUbicacionByIdTarea(idTarea){
        //await _ubicacionRep.mongoGetUbicacionRecogidaByIdTarea(idTarea);
        return await _ubicacionRep.mongoGetUbicacionByIdTarea(idTarea);
    }
    async mongoGetParada(idSuper){
        //await _ubicacionRep.mongoGetUbicacionRecogidaByIdTarea(idTarea);
        return await _ubicacionRep.mongoGetParada(idSuper);
    }
    async mongoUpdate(idUbi, ubicacion){
        return await _ubicacionRep.mongoUpdate(idUbi, ubicacion);
    }
    
}