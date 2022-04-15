const BaseRepository = require('./base.repository');

let _tarea = null;
let _empleado = null;
let _tareaHasEmpleados = null;

module.exports = class TareaRepository extends BaseRepository{
    constructor({Tarea, TareaHasEmpleados, Empleado}){
        super(Tarea);
        _tarea = Tarea;
        _empleado = Empleado;
        _tareaHasEmpleados = TareaHasEmpleados;
    }

    async mongoGetTareasByIdEmpleado(idEmpleado,pageSize = 5, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);
        const idTareas = await _tareaHasEmpleados.find({"idEmpleado":idEmpleado});
        return await _tarea
            .find({idTarea:idTareas})
            .skip(skips)
            .limit(pageSize);
    }

    async mongoGetTareaByIdTarea(idTarea) {
        return await _tarea.findOne({idTarea:idTarea});
    }

    async mongoAddEmpleado(idTarea, idEmpleado){
        const _idMTarea = await _tarea.findOne({idTarea:idTarea},{_id:1});
        if(!_idMTarea){
            return false;
        }
        const _idMEmpleado = await _empleado.findOne({idEmpleado:idEmpleado},{_id:1});
        if(!_idMEmpleado){
            return false;
        }
        console.log(_idMTarea + " /// " + _idMEmpleado);
        
        return await _tareaHasEmpleados.create(
            {
                idTarea:_idMTarea,
                idEmpleado:_idMEmpleado
            }
        );
    }

    async mongoGetTareaByNombre(nombre){
        return await _tarea.findOne({nombre:nombre});
    }
}

