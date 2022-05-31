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
    async mongopruebas(){
        return await _tareaRep.mongopruebas();
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
        return await _solicitudRep.mongoSolicitarTarea(idTarea, idEmpleado);
    }
    async mongoGetAllSolicitudes(pageSize, pageNum,campo={$query: {}, $orderby: { fechasolicitud : 1 }}){
        const sols = await _solicitudRep.mongoGetAll(pageSize, pageNum,campo);
        //console.log(sols);
        let listaRes = [];
        for (var i = 0; i < sols.length; i++) {
            let tar = await _tareaRep.mongoGet(sols[i].idTarea);
            let emp = await _empleadoRep.mongoGet(sols[i].idEmpleado);
            
            listaRes.push({"idSolicitud":sols[i]._id.toString(),"tarea":tar,"empleado":emp,"fechaSolicitud":sols[i].fechaSolicitud})
            //console.log(listaRes[i]);
        }
        console.log(listaRes);
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
        const resi = await _solicitudRep.mongoDelete(id);
        if(resi){
            return {status:201,message:"delete solicitud correct"};
        }else{
            return {status:401,message:"delete solicitud error"};
        };
         
    }
}