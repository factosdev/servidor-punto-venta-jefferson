const Usuario = require("../models/Usuario");
const {
  createRefreshToken,
  createToken,
  decodedToken,
} = require("../utils/jwt");
const { createBug } = require("./POST/bug.controller");

const register = async (req, res) => {
  const { usuario, password, repeatPassword, rol } = req.body;

  if (!password || !repeatPassword) {
    return res
      .status(400)
      .send({ message: "Las contraseñas son obligatorias" });
  }

  if (password !== repeatPassword) {
    return res.status(400).send({ message: "Las contraseñas no coinciden" });
  }

  /*   if (!email) {
    return res.status(400).send({ message: "El email es obligatorio" });
  } */

  const usuarioExiste = await Usuario.findOne({
    usuario: usuario.toLowerCase(),
  });

  if (usuarioExiste) {
    return res.status(400).send({ message: "El usuario ya existe" });
  }

  const usuarioNuevo = new Usuario({
    usuario: usuario.toLowerCase(),
    password,
    rol,
  });

  usuarioNuevo.save();

  res
    .status(201)
    .send({ message: "Usuario creado correctamente", usuarioNuevo, rol });
};

const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario) {
      return res.status(404).send({ message: "El usuario es obligatorio" });
    }
    if (!password)
      res.status(404).send({ message: "La contraseña es obligatoria" });

    const user = await Usuario.findOne({ usuario: usuario.toLowerCase() });

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      user,
      rol: user.rol,
      ok: true,
    });
  } catch (error) {
    await createBug(error, "auth:login");
    return res.status(500).json({ message: "error en el servidor", ok: false });
  }
};

//exportamos
module.exports = {
  register,
  login,
};
