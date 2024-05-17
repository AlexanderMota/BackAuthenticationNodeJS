const BaseService = require('./base.service');
const mydb = require('../repositories/mysql');

let _ubicacionRep = null;

module.exports = class UbicacionService extends BaseService{
    constructor({UbicacionRepository}){
        super(UbicacionRepository);
        _ubicacionRep = UbicacionRepository;
    }
    async mongoGetParada(idSuper){
        return await _ubicacionRep.mongoGetParada(idSuper);
    }
    async mongoGetUbicacionByIdTarea(idTarea){
        return await _ubicacionRep.mongoGetUbicacionByIdTarea(idTarea);
    }
    async mongoDeleteParadaByMatricula(idUbi, matricula){
        return await _ubicacionRep.mongoDeleteParadaByMatricula(idUbi, matricula);
    }
}