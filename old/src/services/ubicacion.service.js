const BaseService = require('./base.service');
const mydb = require('../repositories/mysql');

let _ubicacionRep = null;

module.exports = class UbicacionService extends BaseService{
    constructor({UbicacionRepository}){
        super(UbicacionRepository);
        _ubicacionRep = UbicacionRepository;
    }
    async mongoGetUbicacionByIdTarea(idTarea){
        return await _ubicacionRep.mongoGetUbicacionByIdTarea(idTarea);
    }
    async mongoGetUbicacionByIdTarea2(idTarea){
        return await _ubicacionRep.mongoGetUbicacionByIdTarea2(idTarea);
    }
    async mongoGetParada(idSuper){
        return await _ubicacionRep.mongoGetParada(idSuper);
    }
    async mongoDeleteParadaByMatricula(idUbi, matricula){
        return await _ubicacionRep.mongoDeleteParadaByMatricula(idUbi, matricula);
    }
}