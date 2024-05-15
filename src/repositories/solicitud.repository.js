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
        const _idAsignacion = await _tareaHasEmpleados.find({$and:[
            {"idTarea":idTarea},
            {"idEmpleado":idEmpleado}
        ]},{"_id":1});
        if (_idAsignacion !== undefined){
            if (_idAsignacion[0] !== undefined){
                //console.log("el trabajador ya esta registrado en esta tarea")
                return false;
            }
        }

        const _idSolicitud = await _solicitud.find({$and:[
            {"idTarea":idTarea},
            {"idEmpleado":idEmpleado}
        ]},{"_id":1});
        if (_idSolicitud !== undefined){
            if (_idSolicitud[0] !== undefined){
                //console.log("el trabajador ya ha solicitado esta tarea")
                return false;
            }
        }

        //console.log("llegando");
        await _solicitud.create({
            idTarea:idTarea,
            idEmpleado:idEmpleado,
            aprobada:false,
            fechaSolicitud: new Date(Date.now()).toISOString()
        });
        //console.log(resifff);
        return true;
    }
    async mongoGetSolicitudesByEmpleado(idEmpleado){

        const _solicitudes = await _solicitud.find({idEmpleado:idEmpleado});
        if (_solicitudes.length < 1){
            return {status:403,message:"Sin solicitudes."};
        }

        return _solicitudes;
    }
    
    async mongoDeleteSolicitudByEmpleadoTarea(idTar,idEmp){

        const _solicitudes = await _solicitud.find({$and:[
            {idTarea:idTar},
            {idEmpleado:idEmp}
        ]},{"_id":1});

        if(Array.isArray(_solicitudes)){
            if(_solicitudes.length > 1){
                return {status:405,message:"Se han encontrado varias solicitudes con los mismos datos."};
            }else if (_solicitudes.length < 1){
                return {status:403,message:"Sin solicitudes."};
            }else{
                await _solicitud.findByIdAndDelete(_solicitudes[0]._id);
                return {status:203,message:"Solicitudes eliminadas correctamente."};
            }
        }

        return {status:406,message:"Error inesperado."};
    }
    async findByIdAndDelete(id){
        return await _solicitud.findByIdAndDelete(id);
    }
    async deleteManyByIdTarea(idTar){
        return await _solicitud.deleteMany({idTarea:idTar});
    }
}