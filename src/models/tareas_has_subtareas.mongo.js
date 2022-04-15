const mongoose = require("mongoose");
const { Schema } = mongoose;

const Tarea_has_subtareasSchema = new Schema({
  idTarea: { type: Number, required: true },
  idSubtarea: { type: Number, required: true }
});

module.exports = mongoose.model("tarea_has_subtareas", Tarea_has_subtareasSchema);
