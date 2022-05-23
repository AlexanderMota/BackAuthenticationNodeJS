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
    async mongoGetEmpleadoByIdEmpleado(idEmpleado){
        return await _empleadoRep.mongoGetEmpleadoByIdEmpleado(idEmpleado);
    }
    async mongoGetEmpleadosByIdTarea(idTarea, pageSize, pageNum){
        return await _empleadoRep.mongoGetEmpleadosByIdTarea(idTarea, pageSize, pageNum);
    }
    async mongoGetEmpleadoByNombre(nombre){
        return await _empleadoRep.mongoGetEmpleadoByNombre(nombre);
    }
    async mongoGetEmpleadoByEmail(email){
        return await _empleadoRep.mongoGetEmpleadoByEmail(email);
    }
    async mongoUpdate(idEmpleado, empleado){
        if (!idEmpleado) {
          const error = new Error();
          error.status = 400;
          error.message = "id must be sent";
          throw error;
        }
        const {_id} = await _empleadoRep.mongoGetEmpleadoByIdEmpleado(idEmpleado);
    
        if (!_id) {
          const error = new Error();
          error.status = 404;
          error.message = "entity does not found";
          throw error;
        }
    
        await _empleadoRep.mongoUpdate(_id,empleado);
        return {status : 201, message:"entity updated"}
    }
}