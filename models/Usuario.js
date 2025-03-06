const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nombre: String,
  apellido: String,
  usuario: String,
  email: String,
  password: String,
  rol: {
    type: String,
    default: "otro",
  },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
