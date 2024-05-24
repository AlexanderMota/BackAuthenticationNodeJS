const BaseRepository = require('./base.repository');
const { ObjectId } = require('mongodb');

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
        const idEmpleados  = await _tareaHasEmpleados.find({idTarea:idTarea});
        
        if(!idEmpleados){
            return false;
        }
        const empleados = [];


        for (var i = 0; i < idEmpleados.length; i++) {
            let emp = await _empleado.find({_id:idEmpleados[i].idEmpleado});
            empleados.push(emp[0]);
        }
        return empleados;
    }
    async mongoGetEmpleadosDisponibles(idSuper, rolBuscar){
        const empleados = await _empleado.find({
            centroTrabajo: idSuper, 
            'rol.nombre': rolBuscar 
        });
        if(!empleados){
            return false;
        }
        return empleados;
    }
    async mongoDelete(idEmpleado) {
        await _tareaHasEmpleados.deleteMany({idEmpleado:idEmpleado});
        return await _empleado.findByIdAndDelete(idEmpleado);
    }
}

