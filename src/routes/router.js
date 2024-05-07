const express = require("express");
const router = express.Router();
const multer = require("multer");
const { verify } = require("../controllers/Verify.js");
const {
  createIncidencias,
  deleteIncidencias,
  getIncidencias,
  editarIncidencias,
  getHistorial,
  getIncidenciasbyuser,
} = require("../controllers/Incidencias.js");
const {
  getEstado,
  getUsuarioInci,
  getPrioridad,
  getEstadoNext,
  getSLA,
} = require("../controllers/Select.js");
const {
  createConfiguracion,
  deleteConfiguracion,
  getConfiguraciones,
  editarConfiguracion,
} = require("../controllers/Configuracion.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/verify", (req, res) => {
  verify(req, res);
});

//incidencias
router.post("/Incidencias", (req, res) => {
  createIncidencias(req, res);
});
router.delete("/Incidencias", (req, res) => {
  deleteIncidencias(req, res);
});
router.get("/Incidencias", (req, res) => {
  getIncidencias(req, res);
});

router.get("/Incidenciasbyuser", (req, res) => {
  getIncidenciasbyuser(req, res);
});
router.put("/Incidencias", (req, res) => {
  editarIncidencias(req, res);
});
router.get("/HistorialIncidencias", (req, res) => {
  getHistorial(req, res);
});

//configuaracion
router.post("/Configuracion", (req, res) => {
  createConfiguracion(req, res);
});
router.delete("/Configuracion", (req, res) => {
  deleteConfiguracion(req, res);
});
router.get("/Configuracion", (req, res) => {
  getConfiguraciones(req, res);
});
router.put("/Configuracion", (req, res) => {
  editarConfiguracion(req, res);
});

//Select
router.get("/Select", (req, res) => {
  getEstado(req, res);
});
router.get("/SelectUsuarioInci", (req, res) => {
  getUsuarioInci(req, res);
});
router.get("/SelectPrioridad", (req, res) => {
  getPrioridad(req, res);
});

router.get("/SelectEstadoNext", (req, res) => {
  getEstadoNext(req, res);
});

router.get("/getSLA", (req, res) => {
  getSLA(req, res);
});

module.exports = router;
