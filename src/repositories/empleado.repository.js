const BaseRepository = require('./base.repository');

let _empleado = null;

module.exports = class EmpleadoRepository extends BaseRepository{
    constructor({Empleado}){
        super(Empleado);
        _empleado = Empleado;
    }

    async getEmpleadoByNombre(nombre){
        return await _empleado.findOne({nombre});
    }
}

