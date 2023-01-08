import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  edad: { type: Number, required: true },
  contacto: { type: Number, required: true },
  avatar: { type: String, required: true },
});

const UsuariosModel = mongoose.model("usuarios", usuariosSchema);

export default UsuariosModel;
