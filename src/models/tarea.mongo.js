const mongoose = require("mongoose");
const comentarioMongo = require("./comentario.mongo");
const { Schema } = mongoose;

const TareaSchema = new Schema({
  idTarea: { type: Number, required: false },
  nombre: { type: String, required: true },
  departamento: { type: String, required: true },
  descripcion: { type: String, required: true },
  importancia: { type: String, required: true },
  fechainicio: { type: String, required: true },
  fechafin: { type: String, required: false },
  fechaRegistro: { type: String , default: new Date(Date.now()).toISOString() },
  terminada: { type: Boolean, required: true },
  numeroTrabajadores: { type: Number, required: true },
  precioHora: { type: Number, required: false }
});

module.exports = mongoose.model("tarea", TareaSchema);
