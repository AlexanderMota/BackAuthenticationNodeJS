const BaseRepository = require('./base.repository');
const { ObjectId } = require('mongodb');

let _tarea = null;
let _supertarea = null;
let _empleado = null;
let _comentario = null;
let _tareaHasEmpleados = null;
let _tareaHasSubtareas = null;
let _solicitudRep = null;
let _ubicacion = null;

module.exports = class TareaRepository extends BaseRepository{
    constructor({Tarea, Supertarea, TareaHasEmpleados, TareaHasSubtareas, Empleado, Comentario, SolicitudRepository, Ubicacion}){
        super(Tarea);
        _tarea = Tarea;
        _supertarea = Supertarea;
        _empleado = Empleado;
        _tareaHasEmpleados = TareaHasEmpleados;
        _tareaHasSubtareas = TareaHasSubtareas;
        _solicitudRep = SolicitudRepository;
        _comentario = Comentario;
        _ubicacion = Ubicacion;
    }
    async mongoGetComentariosEst(){
        const comentario = await _comentario.findAll();
        if(!comentario){
            return {status: 208, message:"No se encontró ningún comentario con el id especificado."}
        }
        return comentario;
    } 
    async mongoCreateSupertarea( idSuper) {
        const supert = await _supertarea.find({idTarea:idSuper});
        if(supert.length > 0){
            return {status:406,message:"La super ya existe."}
        }

        const supers = await _supertarea.create({idTarea:idSuper});

        if(supers){
            return {status:202,message:"La super ha sido creada correctamente._"+supers._id.toString()}
        }else{
            return {status:407,message:"Error al crear la super."}
        }
    }
    async mongoGetTareasBy(parametro, nombreParam, objDevolver = {_id: true, nombre: true}) {
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
    async mongoGetComentarioById(id){
        const comentario = await _comentario.findOne(new ObjectId(id));
        if(!comentario){
            return {status: 208, message:"No se encontró ningún comentario con el id especificado."}
        }
        return comentario;
    }
    async mongoGetComentariosByIdTarea(idTarea, pageSize = 20, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);
        
        const idComentarios = await _comentario.find({idTarea : idTarea });

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

        const { plantilla } = await _tarea.findOne({_id:idTarea},{_id:0, plantilla:1});
        const { rol } = await _empleado.findOne({_id:idEmpleado},{_id:0, rol:1});

        let flag = false;
        plantilla.forEach(val => {
            if(val.rol == rol.nombre){
                flag = true;
            }
        });
        if (!flag){
            console.log("El empleado no tiene un rol válido para la tarea especificada.");
            return {status: 408, message:"El empleado no tiene un rol válido para la tarea especificada."};
        }


        const empleadosActuales = await _tareaHasEmpleados.find({idTarea:idTarea},{_id:0,idEmpleado:1});
        const empAct = [];
        empleadosActuales.forEach(val => {
            empAct.push(val.idEmpleado);
        });
        const numEmpleadosRol = await _empleado.countDocuments({
            _id: { $in: empAct }, 'rol.nombre': rol.nombre 
        });
        let flag2 = false;
        plantilla.forEach(val =>{
            if(val.rol == rol.nombre){
                if(numEmpleadosRol >= val.cantidad){ flag2 = true; }
            }
        });
        if(flag2){
            return {status: 409, message:"La tarea no admite mas empleados con este rol: " + rol.nombre};
        }


        const _id = await _tareaHasEmpleados.find({$and:[
            {"idTarea":idTarea},
            {"idEmpleado":idEmpleado}
        ]},{"_id":1});
        if (_id !== undefined){
            if (_id[0] !== undefined){
                return {status: 407, message:"Parece que el trabajador ya esta registrado en esta tarea."};
            }
        }
       

        await _tareaHasEmpleados.create({
            idTarea:idTarea,
            idEmpleado:idEmpleado,
            fechacreacion:new Date(Date.now()).toISOString()
        });
        return { status: 201, message: "Trabajador registrado en la tarea." };
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
            fecha:new Date(Date.now())
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
            let resss;
            if(res3.length > 0) {
                resss = await _solicitudRep.findByIdAndDelete(res3[0]._id);
            }
            
            const res4 = await _tareaHasEmpleados.findByIdAndDelete(resi[0]._id);
            if(res4){
                let mess = "La relación se ha eliminado correctamente."
                if(resss != undefined) {mess += " Tambien se eliminó una solicitud."}
                return {status:201,message:mess};
            }else{
                return {status:401,message:"delete contrato error."};
            };
        }else{
            return {status:402,message:"Se encontró al menos 1 resultado pero este presenta problemas."};
        }
         
    }
    async mongoQuitaComentarioTarea(id){
        return await _comentario.findByIdAndDelete(id);
    }
    async mongoDelete(idTarea,conservaSubs) {
        const superOriginaria = await _tareaHasSubtareas.find({ idSubtarea: idTarea });
        if(superOriginaria.length > 1){
            return {status: 405,message:"Problema al determinar la tarea de la que deriba la tarea que intenta elmininar."}
        }else if(superOriginaria.length < 1){
            return {status: 406,message:"Intenta eliminar una supertarea. Falta implemntar la eliminacion del dato Supertarea."}
        }else if(superOriginaria.length == 1){

            const res3 = await _tarea.findByIdAndDelete(idTarea);
            await _tareaHasSubtareas.findByIdAndDelete(superOriginaria[0]._id);
            await _comentario.deleteMany({idTarea:idTarea});
            await _tareaHasEmpleados.deleteMany({idTarea:idTarea});
            await _ubicacion.deleteMany({idTarea:idTarea});
            await _solicitudRep.deleteManyByIdTarea(idTarea);

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
                        await _tareaHasSubtareas.findByIdAndDelete(val._id);
                        await _tarea.findByIdAndDelete(val.idSubtarea);
                    });

                    return {status: 203,message:"Tarea y subtareas ("+subtareasHuerfanas.length+") eliminadas."};
                }

            }
        }
    }
}

