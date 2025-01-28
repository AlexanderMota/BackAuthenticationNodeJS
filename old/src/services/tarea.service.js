const BaseService = require('./base.service');
const mydb = require('../repositories/mysql');
var mongoose = require('mongoose');

let _tareaRep = null;
let _empleadoRep = null;

module.exports = class TareaService extends BaseService{
    constructor({TareaRepository, EmpleadoRepository}){
        super(TareaRepository);
        _tareaRep = TareaRepository;
        _empleadoRep = EmpleadoRepository;
    }
    async mongoGetComentariosEst(){
        return await _tareaRep.mongoGetComentariosEst();
    }
    async mongoGetTareasEst(){
        return await _tareaRep.mongoGetTareasEst();
    }
    async mongoCreateSupertarea(idTarea){
        return await _tareaRep.mongoCreateSupertarea(idTarea);
    }
    async mongoGetTareasBy(parametro, nombreParam,pageSize , pageNum ) {
        return await _tareaRep.mongoGetTareasBy(parametro, nombreParam,pageSize, pageNum);
    }
    async mongoGetTareaByIdTarea(idTarea){
        return await _tareaRep.mongoGetTareaByIdTarea(idTarea);
    }
    async mongoGetSupertareas(){
        return await _tareaRep.mongoGetSupertareas();
    }
    async mongoGetSubtareasByIdTarea(idTarea, pageSize, pageNum){
        return await _tareaRep.mongoGetSubtareasByIdTarea(idTarea, pageSize, pageNum);
    }
    async mongoGetComentarioById(id ){
        return await _tareaRep.mongoGetComentarioById(id);
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
    async mongoDelete(idTar,conservaSubs){
        return await _tareaRep.mongoDelete(idTar,conservaSubs);
    }
    async mongoQuitaEmpleadoTarea(idTar, idEmpleado){
        return await _tareaRep.mongoQuitaEmpleadoTarea(idTar, idEmpleado);
    }
    async mongoQuitaComentarioTarea(id){
        return await _tareaRep.mongoQuitaComentarioTarea(id);
    }
}