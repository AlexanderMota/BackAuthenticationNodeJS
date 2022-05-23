const {JwtHelper,JwtHelperVerify} = require('../helpers');
let _empleadoService = null;

module.exports = class AuthService{
    constructor({EmpleadoService}){
        _empleadoService = EmpleadoService;
    }
    async compruebaToken(token){
        await JwtHelperVerify.verifyToken(token);
        return {status: 201, message:"El token sigue activo"};
    }

    async signUp(empleado){
        const {email} = empleado;
        const empleadoExists = await _empleadoService.mongoGetEmpleadoByNombre(nombre);
        if(empleadoExists){
            const error = new Error();
            error.status = 400;
            error.message = "El empleado ya existe";
            throw error;
        }

        await _empleadoService.mongoCreate(empleado);
        return {status: 201, message:"Empleado registrado con exito"};
    }
    
    async signIn(empleado){
        const {email,password} = empleado;
        const empleadoExists = await _empleadoService.mongoGetEmpleadoByEmail(email);
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

        return {status: 201, message:token};
    }
}