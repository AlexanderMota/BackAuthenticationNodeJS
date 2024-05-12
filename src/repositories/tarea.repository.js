const BaseRepository = require('./base.repository');
const { ObjectId } = require('mongodb');

let _tarea = null;
let _supertarea = null;
//let _empleado = null;
let _comentario = null;
let _tareaHasEmpleados = null;
let _tareaHasSubtareas = null;
let _solicitudRep = null;

module.exports = class TareaRepository extends BaseRepository{
    constructor({Tarea, Supertarea, TareaHasEmpleados, TareaHasSubtareas/*, Empleado*/, Comentario, SolicitudRepository}){
        super(Tarea);
        _tarea = Tarea;
        _supertarea = Supertarea;
        //_empleado = Empleado;
        _tareaHasEmpleados = TareaHasEmpleados;
        _tareaHasSubtareas = TareaHasSubtareas;
        _comentario = Comentario;
        _solicitudRep = SolicitudRepository;
    }
    /*async mongopruebas() {
        const resi = await _tarea.find();
        //console.log(resi);
        return {status:0,message:"en pruebas"};
    }*/
    async mongoGetTareasBy(parametro, nombreParam, objDevolver = {_id: true, nombre: true}/*,pageSize = 5, pageNum = 1*/) {
        //const skips = pageSize * (pageNum - 1);
        const tar = await _tarea.findOne({[nombreParam]:parametro},objDevolver);
        
        if(!tar){
            return false;
        }
        return tar;
        /*return await _tarea
            .find({ _id:{ $in: ids}})
            .skip(skips)
            .limit(pageSize);*/
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
        const skips = pageSize * (pageNum - 1);

        //console.log('tareaRepository < mongoGetComentariosByIdTarea < ' + idTarea + ' - pageSize(' + pageSize + ') - pageNum(' + pageNum + ')');
        
        const idComentarios = await _comentario.find({idTarea : idTarea }/*,{_id:0,idComentario:1}*/);
        
        //console.log('tareaRepository > mongoGetComentariosByIdTarea > ' + idComentarios);

        if(!idComentarios){
            return false;
        }else{
            return idComentarios;
        }
        
        /*const ids = [];
        idComentarios.forEach(async (value) => {
                ids.push(value.idTarea);
            }
        );

        console.log(ids);
        

        return await _tarea
            .find({ _id:{ $in: ids}})
            .skip(skips)
            .limit(pageSize);*/
    }
    async mongoGetSubtareasByIdTarea(idTarea, pageSize = 5, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);
        
        const relSubtareas = await _tareaHasSubtareas.find({idTarea : idTarea },{_id:0,idSubtarea:1});
        //console.log("res tareaRep.SubTByIdT(): "+ relSubtareas);

        if(!relSubtareas){
            return false;
        }
        
        const ids = [];
        relSubtareas.forEach(async (value) => {
                ids.push(value.idSubtarea);
            }
        );

        return await _tarea
            .find({ _id:{ $in: ids}})
            .skip(skips)
            .limit(pageSize);
        /*const idsSubtareas = [];
        for(var i = 0; i < relSubtareas.length ;i++){
            idsSubtareas.push(relSubtareas[i].idSubtarea);
        }

        const subtareas = await _tarea.find({ _id: { $in: idsSubtareas } });
        
        if(!subtareas){
            return false;
        }else{
            return subtareas;
        }*/
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
        //console.log(idTarea, idEmpleado);
        const { numeroTrabajadores } = await _tarea.findOne({_id:idTarea},{_id:0, numeroTrabajadores:1});
        
        const empleadosActuales = await _tareaHasEmpleados.countDocuments({idTarea:idTarea});
        

        if (empleadosActuales >= numeroTrabajadores){
            console.log("La tarea no admite más empleados.")
            return {status: 406, message:"La tarea no admite más empleados."};
        }
        
        //console.log(empleadosActuales);

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
        //console.log(_id);
        if(_id.length > 1){
            //console.log("la super ya existe");
            return false;
        }

        const res = await _supertarea.create({
            idTarea:idTarea
        });
        if(res){
            return true;
        }
        return false;
    }

    async mongoQuitaEmpleadoTarea(idTar,idEmp){
        //const resi = await _tareaHasEmpleados.mongoDelete(id);
        const resi = await _tareaHasEmpleados.find({$and:[
            {idTarea:idTar},
            {idEmpleado:idEmp}
        ]},{"_id":1});

        //console.log(resi);
        if(resi.length < 1){
            return {status:405,message:"No se ha encontrado el contrato solicitado."};
        }else if(resi.length > 1){
            return {status:403,message:"Se encuentran varias solicitudes con los mismos datos."};
        }else if(resi[0]._id){
            //console.log("res3:");
            const res3 = await _solicitudRep.mongoGetSolicitudByEmpleadoTarea(idTar,idEmp);
            const res2 = await _tareaHasEmpleados.findByIdAndDelete(resi[0]._id);
            //console.log(res3);
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
        //644ef69d4a5f2975a196155c
        console.log(idTarea,"_",conservaSubs);
        const superOriginaria = await _tareaHasSubtareas.find({ idSubtarea: idTarea });
        console.log("superOriginaria: ");
        console.log(superOriginaria);
        if(superOriginaria.length > 1){
            return {status: 405,message:"Problema al determinar la tarea de la que deriba la tarea que intenta elmininar."}
        }else if(superOriginaria.length < 1){
            return {status: 406,message:"Intenta eliminar una supertarea. Falta implemntar la eliminacion del dato Supertarea."}
        }else if(superOriginaria.length == 1){
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
            await _tareaHasSubtareas.findByIdAndDelete(superOriginaria[0]._id);
            const res1 = await _comentario.deleteMany({idTarea:idTarea});
            console.log(res1);
            const res2 = await _tareaHasEmpleados.deleteMany({idTarea:idTarea});
            console.log(res2);
            const res4 = await _tarea.findByIdAndDelete(idTarea);
            console.log(res4);

            if(conservaSubs == 1){
                const subtareasHuerfanas = await _tareaHasSubtareas.find({ idTarea: idTarea });
                console.log("subtareasHuerfanas:");
                console.log(subtareasHuerfanas);
                if(subtareasHuerfanas.length < 1){
                    return {status: 202,message:"Tarea eliminada (Sin subtareas)."};
                }else {
                    subtareasHuerfanas.forEach(async val=>{
                        val.idTarea=superOriginaria[0].idTarea;
                        const iddd = val._id;
                        delete val._id;
                        await _tareaHasSubtareas.findByIdAndUpdate(iddd, val);
                    });

            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
            // se debe gestionar el borrado de una posible ubicacion especifica para la tarea, teniendo en cuenta el metodo que busca la super ams proxima con ubi
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////

                    return {status: 203,message:"Tarea eliminada y subtareas ("+subtareasHuerfanas.length+") reubicadas ("+superOriginaria[0].idTarea+")."};
                }

            }else if(conservaSubs == 0){
                const res1 = await _comentario.deleteMany({idTarea:idTarea});
                console.log(res1);
                const res2 = await _tareaHasEmpleados.deleteMany({idTarea:idTarea});
                console.log(res2);
                const res3 = await _tareaHasSubtareas.deleteMany({ idSubtarea: idTarea });
                console.log(res3);
                const res4 = await _tarea.findByIdAndDelete(idTarea);
                console.log(res4);

            }
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////
        }
    }
        /**/
      
    
}

