const BaseRepository = require('./base.repository');

let _tarea = null;
let _empleado = null;
let _tareaHasEmpleados = null;

module.exports = class TareaRepository extends BaseRepository{
    constructor({Tarea, TareaHasEmpleados, Empleado}){
        super(Tarea);
        _tarea = Tarea;
        _empleado = Empleado;
        _tareaHasEmpleados = TareaHasEmpleados;
    }
    async mongopruebas() {
        const resi = await _tarea.find();
        //console.log(resi);
        return {status:0,message:"en pruebas"};
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

    async mongoGetTareaByIdTarea(idTarea) {
        return await _tarea.findOne({idTarea:idTarea});
    }

    async mongoGetTareaByNombre(nombre){
        return await _tarea.findOne({nombre:nombre});
    }

    async mongoAddEmpleado(idTarea, idEmpleado){

        const _id = await _tareaHasEmpleados.find({$and:[
            {"idTarea":idTarea},
            {"idEmpleado":idEmpleado}
        ]},{"_id":1});
        

        if (_id !== undefined){
            if (_id[0] !== undefined){
                console.log("Parece que el trabajador ya esta registrado en esta tarea")
                return false;
            }
        }
        
        await _tareaHasEmpleados.create({
            idTarea:idTarea,
            idEmpleado:idEmpleado,
            fechacreacion:new Date(Date.now())
        });
        return true;
    }
    async mongoQuitaEmpledeTarea(id){
        const resi = await _tareaHasEmpleados.mongoDelete(id);
        if(resi){
            return {status:201,message:"delete contrato correct"};
        }else{
            return {status:401,message:"delete contrato error"};
        };
         
    }
}

