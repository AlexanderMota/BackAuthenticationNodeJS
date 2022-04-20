const BaseRepository = require('./base.repository');

let _tarea = null;
let _empleado = null;
let _solicitud = null;
let _tareaHasEmpleados = null;

module.exports = class SolicitudRepository extends BaseRepository{
    constructor({Solicitud, TareaHasEmpleados, Tarea, Empleado}){
        super(Solicitud);
        _tarea = Tarea;
        _solicitud = Solicitud;
        _empleado = Empleado;
        _tareaHasEmpleados = TareaHasEmpleados;
    }
    async mongoSolicitarTarea(idTarea, idEmpleado){
        const _idMTarea = await _tarea.findOne({idTarea:idTarea},{_id:1});
        if(!_idMTarea){
            return false;
        }

        const _idMEmpleado = await _empleado.findOne({idEmpleado:idEmpleado},{_id:1});
        if(!_idMEmpleado){
            return false;
        }

        const _idAsignacion = await _tareaHasEmpleados.find({$and:[
            {"idTarea":_idMTarea._id.toString()},
            {"idEmpleado":_idMEmpleado._id.toString()}
        ]},{"_id":1});
        if (_idAsignacion !== undefined){
            if (_idAsignacion[0] !== undefined){
                console.log("Parece que el trabajador ya esta registrado en esta tarea")
                return false;
            }
        }

        const _idSolicitud = await _solicitud.find({$and:[
            {"idTarea":_idMTarea._id.toString()},
            {"idEmpleado":_idMEmpleado._id.toString()}
        ]},{"_id":1});
        if (_idSolicitud !== undefined){
            if (_idSolicitud[0] !== undefined){
                console.log("Parece que el trabajador ya ha solicitado esta tarea")
                return false;
            }
        }

        return await _solicitud.create({
            idTarea:_idMTarea._id,
            idEmpleado:_idMEmpleado._id,
            fechaSolicitud: new Date(Date.now()).toLocaleDateString() + "_" + new Date(Date.now()).toLocaleTimeString()
        });
    }
}