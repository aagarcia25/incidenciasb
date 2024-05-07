const mysql = require("mysql2");

// const db_config = {
//   host: "database",
//   user: "pladiuser",
//   database: "PLADI",
//   password: "pladipassword",
// };

const db_config = {
  host: "10.210.26.27",
  user: "pladi",
  database: "INCI",
  password: "xQRA0xBC87Gs",
};
let db_connect;

function handleDisconnect() {
  db_connect = mysql.createConnection(db_config);

  db_connect.connect((err) => {
    if (err) {
      console.error("Error de conexión a la base de datos:", err);
      // Reintentar la conexión después de 1 minuto
      setTimeout(handleDisconnect, 60000);
    } else {
      console.log("Conexión exitosa a la base de datos");
    }
  });

  db_connect.on("error", (err) => {
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNRESET") {
      console.error("Se perdió la conexión con la base de datos.");
      // Reintentar la conexión después de 1 minuto
      setTimeout(handleDisconnect, 60000);
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = db_connect;
