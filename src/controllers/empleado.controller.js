let _empleadoService = null;

module.exports = class EmpleadoController {
  constructor({ EmpleadoService }) {
    _empleadoService = EmpleadoService;
  }

  async get(req, res) {
    const { idEmpleado } = req.params;
    const empleado = await _empleadoService.get(idEmpleado);
    return res.send(empleado);
  }

  async getAll(req, res){
    const empleados = await _empleadoService.getAll();
    return res.send(empleados);
  }

  async update(req, res){
    const {body} = req;
    const {idEmpleado} = req.params;
    const updateEmpleado = await _empleadoService.update(idEmpleado,body);
    return res.send(updateEmpleado);
  }

  async delete(req,res){
    const {idEmpleado} = req.params;
    const deletedEmpleado = await _empleadoService.delete(idEmpleado);
    return res.send(deletedEmpleado);
  }
}

