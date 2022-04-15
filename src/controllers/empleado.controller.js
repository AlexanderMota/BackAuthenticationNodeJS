let _empleadoService = null;

module.exports = class EmpleadoController {
  constructor({ EmpleadoService }) {
    _empleadoService = EmpleadoService;
  }

  async mongoGet(req, res) {
    const { idEmpleado } = req.params;
    const empleado = await _empleadoService.mongoGet(idEmpleado);
    return res.send(empleado);
  }

  async mongoGetAll(req, res){
    const {pageSize, pageNum} = req.query;
    console.log(pageSize);
    const empleados = await _empleadoService.mongoGetAll(pageSize, pageNum);
    return res.send(empleados);
  }

  async mysqlGetAll(req, res){
    const empleados = await _empleadoService.mysqlGetAll();
    return res.send(empleados);
  }

  async mongoUpdate(req, res){
    const {body} = req;
    const {idEmpleado} = req.params;
    const updateEmpleado = await _empleadoService.mongoUpdate(idEmpleado,body);
    return res.send(updateEmpleado);
  }

  async mongoDelete(req,res){
    const {idEmpleado} = req.params;
    const deletedEmpleado = await _empleadoService.mongoDelete(idEmpleado);
    return res.send(deletedEmpleado);
  }
}

