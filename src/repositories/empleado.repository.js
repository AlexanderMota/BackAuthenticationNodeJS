const BaseRepository = require('./base.repository');

let _empleado = null;
let _tarea = null;
let _tareaHasEmpleados = null;

module.exports = class EmpleadoRepository extends BaseRepository{
    constructor({Empleado, TareaHasEmpleados, Tarea}){
        super(Empleado);
        _empleado = Empleado;
        _tarea = Tarea;
        _tareaHasEmpleados = TareaHasEmpleados;
    }

    async mongoGetEmpleadoByIdEmpleado(idEmpleado) {
        return await _empleado.findOne({idEmpleado:idEmpleado});
    }

    async mongoGetEmpleadoByEmail(email) {
        return await _empleado.findOne({email:email});
    }
    async mongoGetEmpleadosByIdTarea(idTarea, pageSize = 5, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);
        //const { _id } = await _tarea.findById(idTarea);
        console.log(idTarea);
        /*if(!tareaM){
            return false;
        }*/
        const idEmpleados  = await _tareaHasEmpleados.find({idTarea:idTarea});
        
        //console.log("ids empleados: "+idEmpleados);
        if(!idEmpleados){
            return false;
        }
        const empleados = [];


        for (var i = 0; i < idEmpleados.length; i++) {
            //console.log(idEmpleados[i].idEmpleado);
            let emp = await _empleado.find({_id:idEmpleados[i].idEmpleado});
            //console.log(emp);
            empleados.push(emp);
        }
        //console.log(empleados);
        return empleados;
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
        return listaRes;
    }
    async mongoGetEmpleadoByNombre(nombre){
        return await _empleado.findOne({nombre:nombre});
    }
}

