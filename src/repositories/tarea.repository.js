const BaseRepository = require('./base.repository');

let _tarea = null;

module.exports = class TareaRepository extends BaseRepository{
    constructor({Tarea}){
        super(Tarea);
        _tarea = Tarea;
    }

    async get(idTarea) {
        return await _tarea.findOne({idTarea:idTarea});
    }

    async getTareaByNombre(nombre){
        return await _tarea.findOne({nombre:nombre});
    }
}

