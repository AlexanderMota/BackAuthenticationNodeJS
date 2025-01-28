const mongoose = require("mongoose");
const { Schema } = mongoose;

const Tarea_has_subtareasSchema = new Schema({
  idTarea: { type: String, required: true },
  idSubtarea: { type: String, required: true },
  fechaRegistro: { type: Date, default: () => new Date(), required: true },
  fechacreacion: { type: String, required: false },
});

module.exports = mongoose.model("tarea_has_subtareas", Tarea_has_subtareasSchema);
