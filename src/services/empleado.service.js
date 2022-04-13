const BaseService = require('./base.service');
const mydb = require('../repositories/mysql')

let _empleadoRep = null;

module.exports = class EmpleadoService extends BaseService{
    constructor({EmpleadoRepository}){
        super(EmpleadoRepository);
        _empleadoRep = EmpleadoRepository;
    }
    async getAllSQL(){
        return await mydb();
    }
    async getEmpleadoByNombre(nombre){
        return await _empleadoRep.getEmpleadoByNombre(nombre);
    }
}