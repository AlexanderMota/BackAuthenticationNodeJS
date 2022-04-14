const mongoose = require("mongoose");
const { Schema } = mongoose;

const TareaSchema = new Schema({
  idTarea: { type: Number, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  importancia: { type: String, required: true },
  fechainicio: { type: String, required: true },
  fechafin: { type: String },
  terminada: { type: Boolean, required: true  }
});

module.exports = mongoose.model("tarea", TareaSchema);
