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

    async mongoGetTareasByIdEmpleado(idEmpleado, pageSize = 5, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);
        const idEmpleadoM = await _empleado.find({idEmpleado:idEmpleado},{_id:1});
        if(!idEmpleadoM){
            return false;
        }
        const idTareas = await _tareaHasEmpleados.find({idEmpleado:idEmpleadoM[0]._id.toString()},{_id:0,idTarea:1});
        
        if(!idTareas){
            return false;
        }
        
        const ids = [];
        idTareas.forEach(async (value) => {
                ids.push(value.idTarea);
            }
        );

        return await _tarea
            .find({ _id:{ $in: ids}})
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

        const _id = await _tareaHasEmpleados.find({$and:[
            {"idTarea":_idMTarea._id.toString()},
            {"idEmpleado":_idMEmpleado._id.toString()}
        ]},{"_id":1});
        
        if (_id !== undefined){
            if (_id[0] !== undefined){
                console.log("Parece que el trabajador ya esta registrado en esta tarea")
                return false;
            }
        }

        return await _tareaHasEmpleados.create({
            idTarea:_idMTarea._id,
            idEmpleado:_idMEmpleado._id
        });
    }

    async mongoGetTareaByNombre(nombre){
        return await _tarea.findOne({nombre:nombre});
    }
}

