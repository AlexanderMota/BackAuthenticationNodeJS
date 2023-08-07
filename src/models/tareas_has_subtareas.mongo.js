const mongoose = require("mongoose");
const { Schema } = mongoose;

const Tarea_has_subtareasSchema = new Schema({
  idTarea: { type: String, required: true },
  idSubtarea: { type: String, required: true },
  fechacreacion: { type: String, required: false , default: new Date(Date.now()).toISOString() }
});

module.exports = mongoose.model("tarea_has_subtareas", Tarea_has_subtareasSchema);
