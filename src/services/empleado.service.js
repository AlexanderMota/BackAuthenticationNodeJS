const BaseService = require('./base.service');

let _empleadoRep = null;

module.exports = class EmpleadoService extends BaseService{
    constructor({EmpleadoRepository}){
        super(EmpleadoRepository);
        _empleadoRep = EmpleadoRepository;
    }

    async getEmpleadoByNombre(nombre){
        return await _empleadoRep.getEmpleadoByNombre(nombre);
    }
}