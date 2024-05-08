const mongoose = require("mongoose");
const comentarioMongo = require("./comentario.mongo");
const { Schema } = mongoose;

const TareaSchema = new Schema({
  idTarea: { type: Number, required: false },
  nombre: { type: String, required: true },
  departamento: { type: String, required: true },
  descripcion: { type: String, required: true },
  importancia: { type: String, required: true },
  fechainicio: { type: Date, required: true },
  fechafin: { type: Date, required: false },
  fechaRegistro: { type: Date, default: () => new Date(), required: true },
  terminada: { type: Boolean, required: true },
  plantilla: { type: [{
    rol: {type:String, required: true},
    cantidad: {type:Number, required: true}
  }], required: true},
  precioHora: { type: Number, required: false }
});

module.exports = mongoose.model("tarea", TareaSchema);
