const BaseService = require('./base.service');
const mydb = require('../repositories/mysql')

let _tareaRep = null;

module.exports = class EmpleadoService extends BaseService{
    constructor({TareaRepository}){
        super(TareaRepository);
        _tareaRep = TareaRepository;
    }
    async mysqlGetAll(){
        return await mydb();
    }
    async mongoGetTareaByIdTarea(idTarea){
        return await _tareaRep.mongoGetTareaByIdTarea(idTarea);
    }
    async mongoGetTareaByNombre(nombre){
        return await _tareaRep.mongoGetTareaByNombre(nombre);
    }
    async mongoAddEmpleado(idTarea, idEmpleado){
        return await _tareaRep.mongoAddEmpleado(idTarea, idEmpleado);
    }
    async mongoGetTareasByIdEmpleado(idEmpleado){
        return await _tareaRep.mongoGetTareasByIdEmpleado(idEmpleado);
    }
}