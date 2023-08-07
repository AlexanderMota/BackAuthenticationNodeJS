const BaseService = require('./base.service');
const mydb = require('../repositories/mysql');
var mongoose = require('mongoose');

let _tareaRep = null;
let _empleadoRep = null;
let _solicitudRep = null;

module.exports = class EmpleadoService extends BaseService{
    constructor({TareaRepository, EmpleadoRepository, SolicitudRepository,}){
        super(TareaRepository);
        _tareaRep = TareaRepository;
        _empleadoRep = EmpleadoRepository;
        _solicitudRep = SolicitudRepository;

    }
    /*async mongopruebas(){
        return await _tareaRep.mongopruebas();
    }
    async mysqlGetAll(){
        return await mydb();
    }
*/


    async mongoGetTareasBy(parametro, nombreParam,pageSize , pageNum ) {
        return await _tareaRep.mongoGetTareasBy(parametro, nombreParam,pageSize, pageNum)
    }
    async mongoGetTareaByIdTarea(idTarea){
        return await _tareaRep.mongoGetTareaByIdTarea(idTarea);
        //return await _tareaRep.mongoGetComentariosByIdTarea(idTarea);
    }
    async mongoGetSupertareas(){
        return await _tareaRep.mongoGetSupertareas();
    }
    async mongoGetSubtareasByIdTarea(idTarea){
        return await _tareaRep.mongoGetSubtareasByIdTarea(idTarea);
    }
    async mongoGetComentariosByIdTarea(idTarea, pageSize , pageNum ){
        return await _tareaRep.mongoGetComentariosByIdTarea(idTarea , pageSize , pageNum );
    }
    async mongoGetTareaByNombre(nombre){
        return await _tareaRep.mongoGetTareaByNombre(nombre);
    }
    async mongoGetTareasByIdEmpleado(idEmpleado, pageSize, pageNum){
        return await _tareaRep.mongoGetTareasByIdEmpleado(idEmpleado, pageSize, pageNum);
    }
    async mongoAddEmpleado(idTarea, idEmpleado){
        return await _tareaRep.mongoAddEmpleado(idTarea, idEmpleado);
        //return await _tareaRep.mongoAddComentario(idTarea, idEmpleado, 'Autor del comentario', 'Cuerpo del comentario');
    }
    async addSupertarea(idTarea){
        return await _tareaRep.mongoAddSupertarea(idTarea);
    }
    async addSubtarea(idTarea,idSubtarea){
        return await _tareaRep.mongoAddSubtarea(idTarea, idSubtarea);
    }
    async mongoAddComentario(idTarea, idAutor, nombre, descripcion){
        return await _tareaRep.mongoAddComentario(idTarea, idAutor, nombre, descripcion);
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
            
            listaRes.push({
                "idSolicitud":sols[i]._id.toString(),
                "tarea":tar,
                "empleado":emp,
                "fechaSolicitud":sols[i].fechaSolicitud
            });
        }
        //console.log(listaRes);
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
            //console.log(idObj);
        const resi = await _solicitudRep.mongoDelete(idObj);
        if(resi){
            return {status:201,message:"delete solicitud correct"};
        }else{
            return {status:401,message:"delete solicitud error"};
        };
         
    }
    async mongoQuitaEmpledeTarea(id){
        const resi = await _tareaRep.mongoQuitaEmpledeTarea(id);
        if(resi){
            return {status:201,message:"delete solicitud correct"};
        }else{
            return {status:401,message:"delete solicitud error"};
        };
         
    }
}