let _tareaService = null;
let _solicitudService = null;

module.exports = class TareaController {
  constructor({ TareaService, SolicitudService }) {
    _tareaService = TareaService;
    _solicitudService = SolicitudService;
  }

  async mongoGet(req, res) {
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { id } = req.params;
      console.log("tarCont.mongoGet: ========> "+id);
      const tarea = await _tareaService.mongoGet(id);
      return res.send(tarea);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetTareasBy(req, res) {
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const {parametroBusqueda, valorBusqueda, objDevolver, pageSize, pageNum} = req.query;
      const tarea = await mongoGetTareasBy(valorBusqueda, parametroBusqueda,objDevolver,pageSize, pageNum);
    
      return res.send(tarea);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetSupertareas(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const tareas = await _tareaService.mongoGetSupertareas();
      const tareasProcesados = [];
      tareas.forEach(tarea => {
        tareasProcesados[tareasProcesados.length] = {
          _id:tarea._id.toString(),
          nombre:tarea.nombre,
          departamento:tarea.departamento,
          descripcion:tarea.descripcion,
          importancia:tarea.importancia,
          fechainicio:tarea.fechainicio,
          fechafin:tarea.fechafin,
          terminada:tarea.terminada,
          plantilla:tarea.plantilla
        }
      });
      return res.send(tareasProcesados);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetSubtareasByIdTarea(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const {idTarea} = req.params;
      const {pageSize, pageNum} = req.query;
      const tareas = await _tareaService.mongoGetSubtareasByIdTarea(idTarea,pageSize, pageNum);
      const tareasProcesados = [];
      tareas.forEach(tarea => {
        tareasProcesados[tareasProcesados.length] = {
          _id:tarea._id.toString(),
          nombre:tarea.nombre,
          departamento:tarea.departamento,
          descripcion:tarea.descripcion,
          importancia:tarea.importancia,
          fechainicio:tarea.fechainicio,
          fechafin:tarea.fechafin,
          terminada:tarea.terminada,
          plantilla:tarea.plantilla
        }
      });
      
      return res.send(tareasProcesados);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }

  async mongoGetComentariosByIdTarea(req, res) {
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const { idTarea } = req.params;
      const {pageSize, pageNum} = req.query;
      const comentarios = await _tareaService.mongoGetComentariosByIdTarea(idTarea, pageSize, pageNum);
      
      //console.log(comentarios);
      const comentariosProcesados = [];
      comentarios.forEach(comentario => {
        comentariosProcesados[comentariosProcesados.length] = {
          _id:comentario._id.toString(),
          idTarea:comentario.idTarea.toString(),
          idAutor:comentario.idAutor.toString(),
          nombre:comentario.nombre,
          descripcion:comentario.descripcion,
          fechaRegistro:comentario.fechaRegistro
        }
      });
      //console.log(comentariosProcesados);
      return res.send(comentariosProcesados);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetAll(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const {pageSize, pageNum} = req.query;
      const tareas = await _tareaService.mongoGetAll(pageSize, pageNum,{ $query: {}, $orderby: { nombre : -1 } });
      //console.log(tareas);

      return res.send(tarea);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoGetOrderBy(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const {pageSize, pageNum} = req.query;
      const tareas = await _tareaService.mongoGetOrderBy(pageSize, pageNum);
      //console.log(tareas);
      const tareasProcesados = [];
      tareas.forEach(tarea => {
        tareasProcesados[tareasProcesados.length] = {
          _id:tarea._id.toString(),
          nombre:tarea.nombre,
          departamento:tarea.departamento,
          descripcion:tarea.descripcion,
          importancia:tarea.importancia,
          fechainicio:tarea.fechainicio,
          fechafin:tarea.fechafin,
          terminada:tarea.terminada,
          plantilla:tarea.plantilla
        }
      });
      //console.log(tareasProcesados);
      return res.send(tareasProcesados);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }

  async mongoGetTareasByIdEmpleado(req, res){
    if(req.empleado.rol <= 2 || req.empleado.id == req.params.idEmpleado){
      const {pageSize, pageNum} = req.query;
      const { idEmpleado } = req.params;
      
      const tareas = await _tareaService.mongoGetTareasByIdEmpleado(idEmpleado, pageSize, pageNum);

      const tareasProcesados = [];
      tareas.forEach(tarea => {
        tareasProcesados[tareasProcesados.length] = {
          _id:tarea._id.toString(),
          nombre:tarea.nombre,
          departamento:tarea.departamento,
          descripcion:tarea.descripcion,
          importancia:tarea.importancia,
          fechainicio:tarea.fechainicio,
          fechafin:tarea.fechafin,
          terminada:tarea.terminada,
          plantilla:tarea.plantilla
        }
      });

      return res.send(tareasProcesados);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }

  async addEmpleado(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const { idTarea, idEmpleado, idSolicitud } = req.body;
      const flag = await _tareaService.mongoAddEmpleado(idTarea, idEmpleado);
      if(flag.status < 220){
        if(idSolicitud != ""){
          const solpat = await _solicitudService.mongoGet(idSolicitud);
          solpat.aprobada = true;
          const id = solpat._id;
          delete solpat._id;
          /*const solpat2 = */await _solicitudService.mongoUpdate(id.toString(),solpat);
          
          return res.send({status:202,message:"Solicitud aprobada. " + flag.message});
        }
        return res.send({status:201,message:"Tarea asignada a empleado con exito. " + flag.message});
      }
      return res.send(flag);
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async addSupertarea(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const { idTarea } = req.query;
      const flag = await _tareaService.addSupertarea(idTarea);
      
      if(flag) return res.send({status:201,message:"Supertarea creada con exito"});
      
      return res.send({status:403,message:"Algo fue mal"});
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async addSubtarea(req, res){
    if(req.empleado.rol <= 3 && req.empleado.rol >= 0){
      const { idTarea, idSubtarea } = req.quey;
      const flag = await _tareaService.addSubtarea(idTarea, idSubtarea);
      
      if(flag) return res.send({status:201,message:"Tarea asignada a supertarea con exito"});
      return res.send({status:403,message:"Algo fue mal"});
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoAddComentario(req, res){
    if(req.empleado.rol <= 4 && req.empleado.rol >= 0){
      const  {idTarea, idAutor, nombre, descripcion}= req.body;
      const flag = await _tareaService.mongoAddComentario( idTarea, idAutor, nombre, descripcion );
      if(flag) return res.send({status:201,message:"Comentario asignado a la tarea con exito"});
      return res.send({status:403,message:"Algo fue mal"});
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  
  async mongoCreate(req, res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){

      const {body} = req;
      const {idSuper} = req.query

      if(body._id){
        const tar = await _tareaService.mongoGetTareasBy(body._id,"_id",{_id: 1});
        if(tar) return res.send({status:405,message:"La tarea ya existe en la base de datos",id:resp._id});
      }
      const supertarea = await _tareaService.mongoGetTareasBy(idSuper,"_id",{_id: 1});
      
      if(supertarea){
        const resp =  await _tareaService.mongoCreate(body);
        /*console.log(supertarea);
        console.log(resp);*/
        if(resp?._id){
          await _tareaService.addSubtarea(supertarea._id.toString(),resp._id.toString());

          return res.send({status:201,message:"Tarea creada correctamente._"+resp._id});
        }
      }else if(idSuper == "0b"){
        const resp2 =  await _tareaService.mongoCreate(body);
        return res.send({status: 201, message:"supertarea creada correctamente",id:resp2._id.toString()});
      }else return res.send({status: 400, message:"parametro incorrecto"});
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }

  async mongoUpdate(req, res){
    if(req.empleado.rol <= 3 && req.empleado.rol >= 0){
      const {body} = req;
      //console.log(body);
      const {id} = req.params;
      delete body.fechaRegistro;
      /*const updateTarea = */await _tareaService.mongoUpdate(id,body);
      //console.log(updateTarea);
      
      return res.send({status:202,message:"tarea actualizada correctamente"});
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }

  async mongoDelete(req,res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const {id} = req.params;
      const ids = id.split("_");
      if(Array.isArray(ids)){
        const deleteTarea = await _tareaService.mongoDelete(ids[0],ids[1]);
        //console.log(deleteTarea);
        return res.send(deleteTarea);
      }
      return res.send({status:408,message:"Faltan parámetros."});
      
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
  async mongoQuitaEmpleadoTarea(req,res){
    if(req.empleado.rol <= 2 && req.empleado.rol >= 0){
      const {id} = req.params;
      const ids = id.split("_");
      console.log(ids);
      if(Array.isArray(ids)){
        const deleteSolicitud = await _tareaService.mongoQuitaEmpleadoTarea(ids[0],ids[1]);
        return res.send(deleteSolicitud);
      }
      return res.send({status:408,message:"Faltan parámetros."});
    }
    return res.send({status:407,message:"Usuario no autorizado."});
  }
}

