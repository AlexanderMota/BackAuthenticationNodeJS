const BaseService = require('./base.service');
const mydb = require('../repositories/mysql')

let _tareaRep = null;
let _empleadoRep = null;
let _solicitudRep = null;

module.exports = class EmpleadoService extends BaseService{
    constructor({TareaRepository, EmpleadoRepository, SolicitudRepository}){
        super(TareaRepository);
        _tareaRep = TareaRepository;
        _empleadoRep = EmpleadoRepository;
        _solicitudRep = SolicitudRepository;

    }
    async mysqlGetAll(){
        return await mydb();
    }
    async mongoGetTareaByIdTarea(idTarea){
        return await _tareaRep.mongoGetTareaByIdTarea(idTarea);
    }
    async mongoGetTareaByNombre(nombre){
        return await _tareaRep.mongoGetTareaByNombre(nombre);
    }
    async mongoGetTareasByIdEmpleado(idEmpleado, pageSize, pageNum){
        return await _tareaRep.mongoGetTareasByIdEmpleado(idEmpleado, pageSize, pageNum);
    }
    async mongoAddEmpleado(idTarea, idEmpleado){
        return await _tareaRep.mongoAddEmpleado(idTarea, idEmpleado);
    }
    //hace falta que este metodo genere una notificacion para administrar la solicitud
    async mongoSolicitarTarea(idTarea, idEmpleado){
        return await _tareaRep.mongoSolicitarTarea(idTarea, idEmpleado);
    }
    async mongoGetAllSolicitudes(pageSize, pageNum){
        const sols = await _solicitudRep.mongoGetAll(pageSize, pageNum);
        let listaRes = [];
        
         for (var i = 0; i < sols.length; i++) {
            let tar = await _tareaRep.mongoGet(sols[i].idTarea);
            let emp = await _empleadoRep.mongoGet(sols[i].idEmpleado);
            
            listaRes.push({"tarea":tar,"empleado":emp,"fechaSolicitud":sols[i].fechaSolicitud})
         }
        return listaRes;
    }
}