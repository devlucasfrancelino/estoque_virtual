import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const motosSchema = new Schema({
  modelo: { type: String },
  placa: { type: String },
  renavam: { type: String },
  dono: { type: String },
  valor: { type: String },
  exp: { type: String },
  cor: { type: String },
  ano: { type: String },
  data: { type: String },
  comment: { type: String },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
});

const Motos = models.Motos || model("Motos", motosSchema);

export default Motos;
