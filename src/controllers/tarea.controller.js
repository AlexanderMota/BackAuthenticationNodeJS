let _tareaService = null;

module.exports = class TareaController {
  constructor({ TareaService }) {
    _tareaService = TareaService;
  }

  async get(req, res) {
    const { idTarea } = req.params;
    const tarea = await _tareaService.get(idTarea);
    return res.send(tarea);
  }

  async getAll(req, res){
    const {pageSize, pageNum} = req.query;
    const tarea = await _tareaService.getAll(pageSize, pageNum);
    return res.send(tarea);
  }

  async getAllSQL(req, res){
    const tarea = await _tareaService.getAllSQL();
    return res.send(tarea);
  }
  async update(req, res){
    const {body} = req;
    const {idTarea} = req.params;
    const updateTarea = await _tareaService.update(idTarea,body);
    return res.send(updateTarea);
  }

  async delete(req,res){
    const {idTarea} = req.params;
    const deleteTarea = await _tareaService.delete(idTarea);
    return res.send(deleteTarea);
  }
}

