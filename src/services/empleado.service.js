const BaseService = require('./base.service');
const mydb = require('../repositories/mysql')

let _empleadoRep = null;

module.exports = class EmpleadoService extends BaseService{
    constructor({EmpleadoRepository}){
        super(EmpleadoRepository);
        _empleadoRep = EmpleadoRepository;
    }
    async mysqlGet(){
        return await _empleadoRep.getOne(nombre);
    }
    async mongoGetEmpleadosByIdTarea(idEmpleado){
        return await _empleadoRep.mongoGetEmpleadosByIdTarea(idEmpleado);
    }
    async mongoGetEmpleadosByIdTareaDist(idTarea, pageSize, pageNum){
        return await _empleadoRep.mongoGetEmpleadosByIdTareaDist(idTarea, pageSize, pageNum);
    }
    async mongoGetEmpleadoByNombre(nombre){
        return await _empleadoRep.mongoGetEmpleadoByNombre(nombre);
    }
    async mongoGetEmpleadoByEmail(email){
        return await _empleadoRep.mongoGetEmpleadoByEmail(email);
    }
}