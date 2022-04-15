const {JwtHelper} = require('../helpers');
let _empleadoService = null;

module.exports = class AuthService{
    constructor({EmpleadoService}){
        _empleadoService = EmpleadoService;
    }

    async signUp(empleado){
        const {nombre} = empleado;
        const empleadoExists = await _empleadoService.mongoGetEmpleadoByNombre(nombre);
        if(empleadoExists){
            const error = new Error();
            error.status = 400;
            error.message = "El empleado ya existe";
            throw error;
        }

        return await _empleadoService.mongoCreate(empleado);
    }
    
    async signIn(empleado){
        const {nombre,password} = empleado;
        const empleadoExists = await _empleadoService.mongoGetEmpleadoByNombre(nombre);
        if(!empleadoExists){
            const error = new Error();
            error.status = 404;
            error.message = "El empleado no existe";
            throw error;
        }

        const validPassword = empleadoExists.comparePasswords(password);
        if(!validPassword){
            const error = new Error();
            error.status = 400;
            error.message = "La contraseña no es correcta";
            throw error;
        }

        const empleadoToEncode = {
            idEmpleado:empleadoExists.idEmpleado,
            nombre:empleadoExists.nombre
        };

        const token = JwtHelper.generateToken(empleadoToEncode);

        return {token, empleado:empleadoExists};
    }
}