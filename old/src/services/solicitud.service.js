const BaseService = require('./base.service');
const mydb = require('../repositories/mysql');
var mongoose = require('mongoose');

let _tareaRep = null;
let _empleadoRep = null;
let _solicitudRep = null;

module.exports = class SolicitudService extends BaseService{
    constructor({TareaRepository, EmpleadoRepository, SolicitudRepository}){
        super(SolicitudRepository);
        _tareaRep = TareaRepository;
        _empleadoRep = EmpleadoRepository;
        _solicitudRep = SolicitudRepository;
    }
    async mongoGetSolicitudesEst(){
        return await _solicitudRep.mongoGetSolicitudesEst();
    }
    async mongoGetSolicitudesByEmpleado(idEmpleado){
        return await _solicitudRep.mongoGetSolicitudesByEmpleado(idEmpleado);
    }
    async mongoSolicitarTarea(idTarea, idEmpleado){
        return await _solicitudRep.mongoSolicitarTarea(idTarea, idEmpleado);
    }
    
    async mongoGetAllSolicitudes(pageSize, pageNum,campo={$query: {}, $orderby: { fechasolicitud : 1 }}){
        const sols = await _solicitudRep.mongoGetAll(pageSize, pageNum,campo);
        let listaRes = [];
        for (var i = 0; i < sols.length; i++) {
            let tar = await _tareaRep.mongoGet(sols[i].idTarea);
            let emp = await _empleadoRep.mongoGet(sols[i].idEmpleado);
            
            listaRes.push({
                "idSolicitud":sols[i]._id.toString(),
                "tarea":tar,
                "empleado":emp,
                "fechaSolicitud":sols[i].fechaSolicitud
            });
        }
        return listaRes;
    }
    async mongoGetSolicitud(id){
        const sol = await _solicitudRep.mongoGet(id);
        
        let tar = await _tareaRep.mongoGet(sol.idTarea);
        let emp = await _empleadoRep.mongoGet(sol.idEmpleado);
        const idx = sol._id;
         
        return {"idSolicitud":idx.value,"tarea":tar,"empleado":emp,"fechaSolicitud":sol.fechaSolicitud};
    }
    async mongoDeteleSolicitud(id){
        var idObj = mongoose.Types.ObjectId(id);
        const resi = await _solicitudRep.mongoDelete(idObj);
        if(resi){
            return {status:201,message:"delete solicitud correct"};
        }else{
            return {status:401,message:"delete solicitud error"};
        };
    }
}