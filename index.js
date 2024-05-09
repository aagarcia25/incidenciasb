const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

// set up port
const PORT = 3005;
const HOST = "0.0.0.0";
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
// Aumentar el límite del tamaño permitido
app.use(express.json({ limit: "10mb" })); // Puedes ajustar el límite según tus necesidades
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json()); // Para solicitudes con contenido JSON
// add routes
const router = require("./src/routes/router");
app.use("/api/inci", router);

// run server
const server = app.listen(PORT, HOST, () => {
  const { address, port } = server.address();
  console.log(`Server running on http://${address}:${port}`);
});
