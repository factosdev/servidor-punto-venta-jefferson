const Router = require("express");
const { asureAuth } = require("../middlewares/authenticated");

const router = Router();

const {
  getComprasController,
  getComprasPorDiaController,
  getComprasPorServicioController,
  getCompraController,
  getComprasPorFechaController,
  getCompraComboController,
  getComprasPorSemanaController,
  getComprasPorMes,
} = require("../controllers/GET/compras.controller.js");

const {
  eliminarCompraController,
} = require("../controllers/DELETE/compra.controller.js");
const {
  agregarComentarioACompra,
} = require("../controllers/POST/cliente.controller.js");

router.get("/", asureAuth, getComprasController);

router.post("/nuevo/comentario/:id", asureAuth, agregarComentarioACompra);
router.get("/combo/:id", asureAuth, getCompraComboController);

router.get("/day", asureAuth, getComprasPorDiaController);
router.get("/semana", asureAuth, getComprasPorSemanaController);
router.get("/mes", asureAuth, getComprasPorMes);
router.get("/day/:fecha", asureAuth, getComprasPorFechaController);

router.get("/servicio/:servicio", asureAuth, getComprasPorServicioController);

router.get("/:id", asureAuth, getCompraController);

router.delete("/:id", asureAuth, eliminarCompraController);

module.exports = router;
