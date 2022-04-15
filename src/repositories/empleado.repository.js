const BaseRepository = require('./base.repository');

let _empleado = null;
let _tarea = null;
let _tareaHasEmpleados = null;

module.exports = class EmpleadoRepository extends BaseRepository{
    constructor({Empleado, TareaHasEmpleados, Tarea}){
        super(Empleado);
        _empleado = Empleado;
        _tarea = Tarea;
        _tareaHasEmpleados = TareaHasEmpleados;
    }

    async mongoGetEmpleadoByIdEmpleado(idEmpleado) {
        return await _empleado.findOne({idEmpleado:idEmpleado});
    }

    async mongoGetEmpleadosByIdTarea(idTarea, pageSize = 5, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);
        const idTareaM = await _tarea.find({idTarea:idTarea},{_id:1});
        if(!idTareaM){
            return false;
        }
        const idEmpleados = await _tareaHasEmpleados.find({idTarea:idTareaM[0]._id.toString()},{_id:0,idEmpleado:1});
        
        if(!idEmpleados){
            return false;
        }
        const ids = [];
        idEmpleados.forEach(async (value) => {
                ids.push(value.idEmpleado);
            }
        );

        return await _empleado
            .find({ _id:{ $in: ids}})
            .skip(skips)
            .limit(pageSize);
    }

    async mongoGetEmpleadoByNombre(nombre){
        return await _empleado.findOne({nombre:nombre});
    }
}

