const BaseRepository = require('./base.repository');

let _empleado = null;

module.exports = class EmpleadoRepository extends BaseRepository{
    constructor({Empleado}){
        super(Empleado);
        _empleado = Empleado;
    }

    async mongoGetEmpleadoByIdEmpleado(idEmpleado) {
        return await _empleado.findOne({idEmpleado:idEmpleado});
    }

    async mongoGetEmpleadoByNombre(nombre){
        return await _empleado.findOne({nombre:nombre});
    }
}

