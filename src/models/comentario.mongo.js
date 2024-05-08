const mongoose = require("mongoose");
const { Schema } = mongoose;

const ComentarioSchema = new Schema({
  idTarea: { type: String, required: true },
  idAutor: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, default: () => new Date(), required: true }
});

module.exports = mongoose.model("comentario", ComentarioSchema);
