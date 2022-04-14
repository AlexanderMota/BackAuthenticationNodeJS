const BaseService = require('./base.service');
const mydb = require('../repositories/mysql')

let _tareaRep = null;

module.exports = class EmpleadoService extends BaseService{
    constructor({TareaRepository}){
        super(TareaRepository);
        _tareaRep = TareaRepository;
    }
    async getAllSQL(){
        return await mydb();
    }
    async getTareaByNombre(nombre){
        return await _tareaRep.getTareaByNombre(nombre);
    }
}