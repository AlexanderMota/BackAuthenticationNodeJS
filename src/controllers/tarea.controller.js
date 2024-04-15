let _tareaService = null;

module.exports = class TareaController {
  constructor({ TareaService }) {
    _tareaService = TareaService;
  }

  async mongoGet(req, res) {
    const { id } = req.params;
    //console.log("mongogetTarea"+id);
    const tarea = await _tareaService.mongoGet(id);
    //console.log(tarea);
    return res.send(tarea);
  }
  async mongoGetTareasBy(req, res) {
    const {parametroBusqueda, valorBusqueda, objDevolver, pageSize, pageNum} = req.query;
    const tarea = await mongoGetTareasBy(valorBusqueda, parametroBusqueda,objDevolver,pageSize, pageNum);
    
    return res.send(tarea);
  }
  async mongoGetTareaByIdTarea(req, res) {
    const { idTarea } = req.params;
    console.log(idTarea);
    const tarea = await _tareaService.mongoGetTareaByIdTarea(idTarea);
    //console.log(tarea);
    return res.send(tarea);
  }
  async mongoGetSupertareas(req, res){
    const tarea = await _tareaService.mongoGetSupertareas();
    
    return res.send(tarea);
  }
  async mongoGetSubtareasByIdTarea(req, res){
    const {idTarea} = req.params;
    //console.log("mongoGetSubtareasByIdTarea: " + idTarea);
    const tareas = await _tareaService.mongoGetSubtareasByIdTarea(idTarea);
    //console.log("mongoGetSubtareasByIdTarea: " + tareas);
    return res.send(tareas);
  }

  async mongoGetComentariosByIdTarea(req, res) {
    const { idTarea } = req.params;
    const {pageSize, pageNum} = req.query;
    
    const comentarios = await _tareaService.mongoGetComentariosByIdTarea(idTarea, pageSize, pageNum);
    
    return res.send(comentarios);
  }
  async mongoGetAll(req, res){
    const {pageSize, pageNum} = req.query;
    const tarea = await _tareaService.mongoGetAll(pageSize, pageNum,{ $query: {}, $orderby: { nombre : -1 } });
    return res.send(tarea);
  }
  async mongoGetOrderBy(req, res){
    const {pageSize, pageNum} = req.query;
    const tarea = await _tareaService.mongoGetOrderBy(pageSize, pageNum);
    return res.send(tarea);
  }
  async mongoGetTareasByIdEmpleado(req, res){
    const {pageSize, pageNum} = req.query;
    const { idEmpleado } = req.params;
    
    const tarea = await _tareaService.mongoGetTareasByIdEmpleado(idEmpleado, pageSize, pageNum);
    return res.send(tarea);
  }

  async addEmpleado(req, res){
    const { idTarea, idEmpleado, idSolicitud } = req.query;
    const flag = await _tareaService.mongoAddEmpleado(idTarea, idEmpleado);
    if(flag){
      if(idSolicitud){
        const del = await _tareaService.mongoDeteleSolicitud(idSolicitud);
      }
      return res.send({status:201,message:"Tarea asignada a empleado con exito"});
    }
    return res.send({status:403,message:"Algo fue mal"});
  }
  async addSupertarea(req, res){
    const { idTarea } = req.query;
    
    const flag = await _tareaService.addSupertarea(idTarea);
    //console.log("tareaController.addSupertarea(): " + flag); 
    if(flag){
      return res.send({status:201,message:"Supertarea creada con exito"});
    }
    return res.send({status:403,message:"Algo fue mal"});
  }
  async addSubtarea(req, res){
    const { idTarea, idSubtarea } = req.quey;
    
    const flag = await _tareaService.addSubtarea(idTarea, idSubtarea);
    //console.log("tareaController.addSubtarea(): " + flag);
    if(flag){
      return res.send({status:201,message:"Tarea asignada a supertarea con exito"});
    }
    return res.send({status:403,message:"Algo fue mal"});
  }
  async mongoAddComentario(req, res){
    const  {idTarea, idAutor, nombre, descripcion}= req.body;
    const flag = await _tareaService.mongoAddComentario( idTarea, idAutor, nombre, descripcion );
    if(flag){
      return res.send({status:201,message:"Comentario asignado a la tarea con exito"});
    }
    return res.send({status:403,message:"Algo fue mal"});
  }

  async solicitarTarea(req, res){
    const { idTarea, idEmpleado } = req.query;
    const flag = await _tareaService.mongoSolicitarTarea(idTarea, idEmpleado);
    if(flag){
      return res.send({status:201,message:"Solicitud realizada con exito"});
    } return res.send({status:400,message:"Algo fue mal"});
  }

  async mongoGetAllSolicitudes(req, res){
    const { pageSize, pageNum } = req.query;
    return res.send(await _tareaService.mongoGetAllSolicitudes(pageSize, pageNum));
  }
  async mongoGetSolicitud(req, res){
    const { id } = req.params;
    return res.send(await _tareaService.mongoGetSolicitud(id));
  }

  /*async mysqlGetAll(req, res){
    const tarea = await _tareaService.mysqlGetAll();
    return res.send(tarea);
  }*/
  
  async mongoCreate(req, res){
    const {body} = req;
    //console.log(body);
    const {idSuper} = req.query
    //console.log("idSuper: "+idSuper);
    if(body._id){
      const tar = await _tareaService.mongoGetTareasBy(body._id,"_id",{_id: true});
      if(tar){
        return res.send({status:405,message:"La tarea ya existe en la base de datos",id:resp._id});
      }
    }
    
    const supertarea = await _tareaService.mongoGetTareasBy(idSuper,"_id",{_id: true});
    //const tarea = await _tareaService.mongoGet(idSuper); //esta es una forma de buscar digamos "estática" y la de arriba seria mas dinamica, pudiendo aportar mas flexibilidad al metodo
    //const respSup = await _tareaService.mongoGetTareasBy(idSuper,"nombre");

    //console.log(tarea);
    if(supertarea){
      const resp =  await _tareaService.mongoCreate(body);
      /*console.log(supertarea);
      console.log(resp);*/
      
      if(resp?._id){
        //console.log("idSuper: " + respSup._id.toString() + "\nidSub: " + resp._id);
        const resi = await _tareaService.addSubtarea(supertarea._id.toString(),resp._id.toString());
        //console.log(resi);
        return res.send({status:201,message:"tarea creada correctamente",id:resp._id});
      }
    }else if(idSuper == "0b"){
      const resp2 =  await _tareaService.mongoCreate(body);
      return res.send({status: 201, message:"supertarea creada correctamente",id:resp2._id.toString()});
    //}else if(idSuper == "existe"){
      //registra la tarea en la super
    }else{
      return res.send({status: 400, message:"parametro incorrecto"});
    }
     // return res.send({status: 400, message:"parametro incorrecto"});
  }

  async mongoUpdate(req, res){
    const {body} = req;
    const {id} = req.params;
    
    const updateTarea = await _tareaService.mongoUpdate(id,body);
    
    return res.send({status:202,message:"tarea actualizada correctamente"});
  }

  async mongoDelete(req,res){
    const {id} = req.params;
    const deleteTarea = await _tareaService.mongoDelete(id);
    return res.send(deleteTarea);
  }
  async mongoDeteleSolicitud(req,res){
    const {id} = req.params;
    const deleteSolicitud = await _tareaService.mongoDeteleSolicitud(id);
    return res.send(deleteSolicitud);
  }
  async mongoDeteleContrato(req,res){
    const {id} = req.params;
    const deleteSolicitud = await _tareaService.mongoQuitaEmpledeTarea(id);
    return res.send(deleteSolicitud);
  }
}

