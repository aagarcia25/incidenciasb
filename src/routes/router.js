const express = require("express");
const router = express.Router();
const multer = require("multer");
const { verify } = require("../controllers/Verify.js");
const { createIncidencias, deleteIncidencias, getIncidencias, editarIncidencias } = require("../controllers/Incidencias.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/verify", (req, res) => {
  verify(req, res);
});

//incidencias
router.post("/Incidencias",(req,res)=>{
  createIncidencias(req, res)
})
router.delete("/Incidencias",(req,res)=>{
  deleteIncidencias(req, res)
})
router.get("/Incidencias",(req,res)=>{
  getIncidencias(req, res)
})
router.put("/Incidencias",(req,res)=>{
  editarIncidencias(req, res)
})


module.exports = router;
