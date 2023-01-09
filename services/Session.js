import mongoose from "mongoose";
import UsuariosModel from "../models/UsuariosModel.js";
import { createHash } from "./UtilsSession.js";

export default class SessionService {
  constructor() {
    this.url =
      "mongodb+srv://coderBackend:coderBackendPW@clustercoderbackend.tct9by1.mongodb.net/ProyectoFinal?retryWrites=true&w=majority";
    this.mongodb = mongoose.connect;
  }

  //funciones
  async conectarDB() {
    await this.mongodb(this.url);
  }

  async buscarUsuarioPorEmail(email) {
    await this.conectarDB();
    const usuario = await UsuariosModel.findOne({ email });
    return usuario;
  }

  async registrarUsuario(usuario) {
    await this.conectarDB();
    const userExist = await UsuariosModel.findOne({ email: usuario.email });
    if (userExist) return false;
    usuario.password = createHash(usuario.password);
    const newUser = new UsuariosModel(usuario);
    await newUser.save();
    return true;
  }

  async actualizarUsuario(email, idCar) {
    await this.conectarDB();
    const user = await this.buscarUsuarioPorEmail(email);
    console.log("desdedb", user, idCar);
    await UsuariosModel.findByIdAndUpdate(user._id, {
      $set: { carrito: idCar },
    });
    return true;
  }
}
