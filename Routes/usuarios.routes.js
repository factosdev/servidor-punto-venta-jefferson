const Router = require("express");
const { asureAuth } = require("../middlewares/authenticated");
const { login, register } = require("../controllers/auth.controller");

const app = Router();

app.post("/login", login);
app.post("/register", register);
/* app.post("/nuevo", asureAuth, crearNuevoUsuarioController);
app.get("/", asureAuth, getUsuarios); */

module.exports = app;
