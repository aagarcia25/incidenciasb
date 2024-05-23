const express = require("express");
const utils = require("../utils/responseBuilder.js");
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
  getIncidenciasCanceladas,
  getIncidenciasResueltas,
} = require("../controllers/Incidencias.js");
const {
  getEstado,
  getUsuarioInci,
  getPrioridad,
  getEstadoNext,
  getSLA,
  getEstadisticas,
} = require("../controllers/Select.js");
const {
  createConfiguracion,
  deleteConfiguracion,
  getConfiguraciones,
  editarConfiguracion,
  getParametro,
} = require("../controllers/Configuracion.js");
const { sendEmail } = require("../controllers/Mail.js");


const fs = require('fs');
const { generatePDF } = require("../controllers/generatePdf.js");


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

router.get("/getIncidenciasCanceladas", (req, res) => {
  getIncidenciasCanceladas(req, res);
});

router.get("/getIncidenciasResueltas", (req, res) => {
  getIncidenciasResueltas(req, res);
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

router.post("/getParametro", (req, res) => {
  getParametro(req, res);
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

router.get("/getEstadisticas", (req, res) => {
  getEstadisticas(req, res);
});

router.get("/sendEmail", (req, res) => {
  sendEmail(req, res);
});

router.post('/generate-pdf', async (req, res) => {
  const data = req.body;
   console.log("data",data);
   let arrHistorial = []

   let query = "SELECT ih.Observaciones,ce.Descripcion ceDescripcion,ih.FechaCreacion,getUserName(ih.CreadoPor) modificadopor FROM INCI.IncidenciasHistorial ih LEFT JOIN INCI.CatEstatus ce ON ce.Id= ih.Estatus WHERE idIncidencias = ?"
   const result = await utils.executeQuery(query,[data.Id], (err,result)=>{
    console.log("result",result);
   if(err){
    res.status(500).send('Error generando el PDF');
   }

  
  });

  arrHistorial= result

   try {
    
    let historialNotas = arrHistorial.map((obs) => `
    <p><strong>${new Date(obs.FechaCreacion ? obs.FechaCreacion : "").toLocaleString('es-ES')} - ${obs.modificadopor ? obs.modificadopor : ""}:</strong> ${obs.Observaciones ? obs.Observaciones : 'Sin observaciones'} - ${obs.ceDescripcion ? obs.ceDescripcion : ""}</p>
  `).join('');
  console.log("historialNotas",historialNotas);
    await generatePDF({...data, HistorialObservaciones:historialNotas});
    const file = fs.readFileSync('reporte.pdf');
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
      'Content-Length': file.length,
    });
    res.send(file);
  } catch (error) {
    res.status(500).send('Error generando el PDF'+error);
  }
});

module.exports = router;
