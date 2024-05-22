const BaseRepository = require('./base.repository');
const { ObjectId } = require('mongodb');

let _tarea = null;
let _supertarea = null;
//let _empleado = null;
let _comentario = null;
let _tareaHasEmpleados = null;
let _tareaHasSubtareas = null;
let _solicitudRep = null;
let _ubicacion = null;

module.exports = class TareaRepository extends BaseRepository{
    constructor({Tarea, Supertarea, TareaHasEmpleados, TareaHasSubtareas/*, Empleado*/, Comentario, SolicitudRepository, Ubicacion}){
        super(Tarea);
        _tarea = Tarea;
        _supertarea = Supertarea;
        //_empleado = Empleado;
        _tareaHasEmpleados = TareaHasEmpleados;
        _tareaHasSubtareas = TareaHasSubtareas;
        _solicitudRep = SolicitudRepository;
        _comentario = Comentario;
        _ubicacion = Ubicacion;
    }
    async mongoGetTareasBy(parametro, nombreParam, objDevolver = {_id: true, nombre: true}/*,pageSize = 5, pageNum = 1*/) {
        //const skips = pageSize * (pageNum - 1);
        const tar = await _tarea.findOne({[nombreParam]:parametro},objDevolver);
        
        if(!tar){
            return false;
        }
        return tar;
    }
    async mongoGetTareasByIdEmpleado(idEmpleado, pageSize = 5, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);
        const idTareas = await _tareaHasEmpleados.find({idEmpleado:idEmpleado},{_id:0,idTarea:1});
        
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
    async mongoGetComentariosByIdTarea(idTarea, pageSize = 5, pageNum = 1) {

        //console.log("mongoGetComentariosByIdTarea");
        //const query = { fechacreacion: { $type: "string" } };
        const documents = await _tareaHasSubtareas.find({ fechacreacion: { $exists: true } });
        //console.log(documents);

        documents.forEach(async val=>{
            if(val.fechacreacion.length > 0){
            val.fechaRegistro = val.fechacreacion;
            val.fechacreacion = "";
            await _tareaHasSubtareas.findByIdAndUpdate(val._id,val);
            }
            //console.log(val);
        });




        const skips = pageSize * (pageNum - 1);
        
        const idComentarios = await _comentario.find({idTarea : idTarea }/*,{_id:0,idComentario:1}*/);

        if(!idComentarios){
            return false;
        }else{
            return idComentarios;
        }
    }
    async mongoGetSubtareasByIdTarea(idTarea, pageSize = 5, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);
        
        const relSubtareas = await _tareaHasSubtareas.find({idTarea : idTarea },{_id:0,idSubtarea:1});
        
        if(!relSubtareas){
            return false;
        }
        
        const ids = [];
        relSubtareas.forEach(async (value) => {
                ids.push(new ObjectId(value.idSubtarea));
            }
        );

        return await _tarea
            .find({ _id:{ $in: ids}})
            .skip(skips)
            .limit(pageSize);
    }
    async mongoGetSupertareas( pageSize = 5, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);

        const supers = await _supertarea.find({},{_id:0,idTarea:1})
        .skip(skips)
        .limit(pageSize);

        const insConsulta = [];
        for(var i = 0; i < supers.length ;i++){
            insConsulta.push(new ObjectId(supers[i].idTarea));
        }
        
        const supertars = await _tarea.find({ _id: { $in: insConsulta } });

        if(supertars){
            return supertars;
        }else{
            return false;
        }
    }
    async mongoGetTareaByIdTarea(idTarea) {
        return await _tarea.findOne({idTarea:idTarea});
    }

    async mongoGetTareaByNombre(nombre){
        return await _tarea.findOne({nombre:nombre});
    }

    async mongoAddEmpleado(idTarea, idEmpleado){
        const { numeroTrabajadores } = await _tarea.findOne({_id:idTarea},{_id:0, numeroTrabajadores:1});
        
        const empleadosActuales = await _tareaHasEmpleados.countDocuments({idTarea:idTarea});
        

        if (empleadosActuales >= numeroTrabajadores){
            console.log("La tarea no admite más empleados.")
            return {status: 406, message:"La tarea no admite más empleados."};
        }

        const _id = await _tareaHasEmpleados.find({$and:[
            {"idTarea":idTarea},
            {"idEmpleado":idEmpleado}
        ]},{"_id":1});
        

        if (_id !== undefined){
            if (_id[0] !== undefined){
                console.log("Parece que el trabajador ya esta registrado en esta tarea")
                return {status: 407, message:"Parece que el trabajador ya esta registrado en esta tarea."};
            }
        }
        
        await _tareaHasEmpleados.create({
            idTarea:idTarea,
            idEmpleado:idEmpleado,
            fechacreacion:new Date(Date.now()).toISOString()
        });
        return {status: 201, message:"Trabajador registrado en la tarea."};
    }
    async mongoAddSubtarea(idTarea, idSubtarea){
        const _id = await _tareaHasSubtareas.find({$and:[
            {"idTarea":idTarea},
            {"idSubtarea":idSubtarea}
        ]},{"_id":1});
        

        if (_id !== undefined){
            if (_id[0] !== undefined){
                console.log("Parece que la subtarea ya está registrado en esta tarea")
                return false;
            }
        }
        
        await _tareaHasSubtareas.create({
            idTarea:idTarea,
            idSubtarea:idSubtarea
        });
        return true;
    }

    async mongoAddComentario(idTarea, idEmpleado, nombreComentario, descripcion){
        await _comentario.create({
            idTarea:idTarea,
            idAutor:idEmpleado,
            nombre:nombreComentario,
            descripcion:descripcion,
            fecha:new Date(Date.now()).toISOString()
        });
        return true;
    }
    async mongoAddSupertarea(idTarea){
        const _id = await _supertarea.find({$and:[
            {"idTarea":idTarea}
        ]},{"_id":1});
        if(_id.length > 1) return false;

        const res = await _supertarea.create({idTarea:idTarea});
        if(res) return true;
        return false;
    }

    async mongoQuitaEmpleadoTarea(idTar,idEmp){
        const resi = await _tareaHasEmpleados.find({$and:[
            {idTarea:idTar},
            {idEmpleado:idEmp}
        ]},{"_id":1});

        if(resi.length < 1){
            return {status:405,message:"No se ha encontrado el contrato solicitado."};
        }else if(resi.length > 1){
            return {status:403,message:"Se encuentran varias solicitudes con los mismos datos."};
        }else if(resi[0]._id){
            const res3 = await _solicitudRep.mongoGetSolicitudByEmpleadoTarea(idTar,idEmp);
            await _solicitudRep.findByIdAndDelete(res3[0]._id);
            const res2 = await _tareaHasEmpleados.findByIdAndDelete(resi[0]._id);
            if(res2){
                return {status:201,message:"La relación se ha eliminado correctamente. "+res3.message};
            }else{
                return {status:401,message:"delete contrato error. "+res3.message};
            };
        }else{
            return {status:402,message:"No se ha encontrado el contrato solicitado."};
        }
         
    }
    async mongoDelete(idTarea,conservaSubs) {
        const superOriginaria = await _tareaHasSubtareas.find({ idSubtarea: idTarea });
        if(superOriginaria.length > 1){
            return {status: 405,message:"Problema al determinar la tarea de la que deriba la tarea que intenta elmininar."}
        }else if(superOriginaria.length < 1){
            return {status: 406,message:"Intenta eliminar una supertarea. Falta implemntar la eliminacion del dato Supertarea."}
        }else if(superOriginaria.length == 1){
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////

            const res3 = await _tarea.findByIdAndDelete(idTarea);
            /*const subs = */await _tareaHasSubtareas.findByIdAndDelete(superOriginaria[0]._id);
            /*console.log("subs");
            console.log(subs);*/
            /*const res1 = */await _comentario.deleteMany({idTarea:idTarea});
            /*const res2 = */await _tareaHasEmpleados.deleteMany({idTarea:idTarea});
            /*const res4 = */await _ubicacion.deleteMany({idTarea:idTarea});
            /*const res5 = */await _solicitudRep.deleteManyByIdTarea(idTarea);

            const subtareasHuerfanas = await _tareaHasSubtareas.find({ idTarea: idTarea });

            if(conservaSubs == 1){
                if(subtareasHuerfanas.length < 1){
                    return {status: 202,message:"Tarea eliminada (Sin subtareas)."};
                }else {
                    subtareasHuerfanas.forEach(async val=>{
                        val.idTarea=superOriginaria[0].idTarea;
                        const iddd = val._id;
                        delete val._id;
                        await _tareaHasSubtareas.findByIdAndUpdate(iddd, val);
                    });

                    return {status: 203,message:"Tarea eliminada y subtareas ("+subtareasHuerfanas.length+") reubicadas ("+superOriginaria[0].idTarea+")."};
                }

            }else if(conservaSubs == 0){
                const res33 = await _tareaHasSubtareas.deleteMany({ idTarea: idTarea });

                if(subtareasHuerfanas.length < 1){
                    return {status: 202,message:"Tarea eliminada (Sin subtareas)."};
                }else {
                    subtareasHuerfanas.forEach(async val=>{
                        val.idTarea=superOriginaria[0].idTarea;
                        /*const iddd = val._id;
                        delete val._id;*/
                        /*const res35 = */await _tareaHasSubtareas.findByIdAndDelete(val._id);
                        //console.log(res35);
                        /*const res34 = */await _tarea.findByIdAndDelete(val.idSubtarea);
                        //console.log(res34);
                    });

                    return {status: 203,message:"Tarea y subtareas ("+subtareasHuerfanas.length+") eliminadas."};
                }

            }
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
        }
    }
}

