const BaseRepository = require('./base.repository');
const { ObjectId } = require('mongodb');
const { format } = require('date-fns');

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
    async mongoGetEmpleadosEst() {
        const empleados = await _empleado.find({}, { _id: 0, __v: 0, nombre: 0, apellidos: 0, telefono: 0, email: 0, password: 0}).sort({ fechaRegistro: 1 });
        if (!empleados || empleados.length === 0) {
            return { status: 208, message: "No se encontró ningún empleado." };
        }
        
        // Objeto para almacenar las fechas y sus valores sumados
        const fechaSumaValores = {};
    
        empleados.forEach(empleado => {
            const fecha = format(new Date(empleado.fechaRegistro), 'yyyy-MM-dd');
            if (!fechaSumaValores[fecha]) {
                fechaSumaValores[fecha] = 0;
            }
            // Sumar 1 al valor para cada fecha
            fechaSumaValores[fecha] += 1;
        });
    
        // Convertir el objeto en un array de objetos y ordenar por fecha
        const formattedData = Object.keys(fechaSumaValores)
            .map(fecha => ({ time: fecha, value: fechaSumaValores[fecha] }))
            .sort((a, b) => new Date(a.time) - new Date(b.time));
    
        return formattedData;
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

