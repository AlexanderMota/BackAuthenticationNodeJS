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
    async mysqlGetAll(){
        return await mydb();
    }
    async mongoGetEmpleadoByIdEmpleado(nombre){
        return await _empleadoRep.mongoGetEmpleadoByIdEmpleado(nombre);
    }
    async mongoGetEmpleadoByNombre(nombre){
        return await _empleadoRep.mongoGetEmpleadoByNombre(nombre);
    }
}