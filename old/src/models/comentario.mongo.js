const mongoose = require("mongoose");
const { Schema } = mongoose;

const ComentarioSchema = new Schema({
  idTarea: { type: Schema.Types.ObjectId, ref: 'Tareas', required: true },
  idAutor: { type: Schema.Types.ObjectId, ref: 'Empleados', required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaRegistro: { type: Date, default: () => new Date(), required: true }
});

module.exports = mongoose.model("comentario", ComentarioSchema);
