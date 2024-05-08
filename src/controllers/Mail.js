const nodemailer = require("nodemailer");
const util = require("util");
const utils = require("../utils/responseBuilder.js");

// Función para reemplazar marcadores de posición en la plantilla
const replacePlaceholders = (template, data) => {
  let result = template;
  // Reemplazar cada marcador de posición con el valor correspondiente en 'data'
  for (const key in data) {
    const regex = new RegExp(`{{${key}}}`, "g"); // usar RegExp para hacer reemplazos globales
    result = result.replace(regex, data[key]);
  }
  return result;
};

const transporter = nodemailer.createTransport({
  host: "correo.nl.gob.mx",
  port: 587,
  secure: false,
  auth: {
    user: "sistemas.tv",
    pass: "$ist3m@$tv*",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMailPromise = util.promisify(transporter.sendMail).bind(transporter);

// Hacer que getplantilla sea asincrónico para obtener datos antes de enviar el correo
const getPlantilla = async (referencia) => {
  try {
    const result = await utils.executeQuery("CALL sp_GetPlantilla(?)", [
      referencia,
    ]);
    if (result.length > 0) {
      return result[0];
    } else {
      throw new Error("No se encontró la plantilla.");
    }
  } catch (error) {
    throw new Error("Error al obtener la plantilla: " + error.message);
  }
};

const getIncidencia = async (referencia) => {
  try {
    const query = `
    SELECT
      FormatoFechaCompleto(inc.FechaCreacion) AS FechaCreacion,
      inc.NombreRegistra,
      inc.EmailRegistra,
      inc.TextoInc,
      inc.Prioridades,
      pr.Descripcion AS prDescripcion,
      getUserName(inc.AsignadoA) AS asignadoa
    FROM INCI.Incidencias inc
    LEFT JOIN INCI.CatEstatus ce ON inc.Estatus = ce.Id
    LEFT JOIN INCI.Prioridades pr ON inc.Prioridades = pr.Id
    WHERE inc.Deleted = 0
      AND inc.Id = ?
      AND ce.Descripcion <> 'CANCELADA'
    ORDER BY inc.FechaCreacion DESC
  `;
    const result = await utils.executeQuery(query, [referencia]);
    return result[0];
  } catch (error) {
    throw new Error("Error al obtener la plantilla: " + error.message);
  }
};

const getHistorial = async (referencia) => {
  try {
    const query = `
    SELECT
      ih.FechaCreacion AS Fecha,
      ce.Descripcion AS Estatus,
      ih.Observaciones As Observaciones, 
      getUserName(ih.CreadoPor) AS Actualizado 
    FROM INCI.IncidenciasHistorial ih
    LEFT JOIN INCI.CatEstatus ce ON ce.Id = ih.Estatus
    WHERE idIncidencias = ?
  `;
    const result = await utils.executeQuery(query, [referencia]);
    return result;
  } catch (error) {
    throw new Error("Error al obtener la plantilla: " + error.message);
  }
};

const enviaEmail = async (to, subject, body) => {
  const mailOptions = {
    from: '"PLATAFORMA DE ADMINSITRACIÓN DE INCIDENCIAS" <sistemas.tesoreria.virtual@nuevoleon.gob.mx>',
    to: to,
    subject: subject,
    text: "Plaintext version of the message",
    html: body,
  };

  try {
    const info = await sendMailPromise(mailOptions);
    return "Correo enviado con éxito: " + info.response;
  } catch (error) {
    throw new Error("Error al enviar el correo: " + error.message);
  }
};

const sendEmailHandler = async (req, res) => {
  try {
    // Obtener la plantilla antes de intentar enviar el correo
    let filledTemplate;
    let data;
    const CLAVE = req.query.CLAVE;
    const ID = req.query.ID;
    const EMAIL = req.query.EMAIL;
    const plantilla = await getPlantilla(CLAVE);

    if (!plantilla) {
      throw new Error("La plantilla no está completa.");
    }

    if (CLAVE === "001") {
      data = await getIncidencia(ID);
    } else if (CLAVE === "002") {
      data = await getIncidencia(ID);
      const historial = await getHistorial(ID);

      const rows = historial
        .map((row) => {
          const rowData = Object.values(row)
            .map((value) => `<td>${value ?? ""}</td>`)
            .join("");
          return `<tr>${rowData}</tr>`;
        })
        .join("");

      const headers = Object.keys(historial[0])
        .map((header) => `<th>${header}</th>`)
        .join("");

      const tableHTML = `
                          <table border="1">
                            <thead>
                              <tr>${headers}</tr>
                            </thead>
                            <tbody>
                              ${rows}
                            </tbody>
                          </table>
                          `;

      data.tabla = tableHTML;
    } else if (CLAVE === "003") {
      data = await getIncidencia(ID);
      const historial = await getHistorial(ID);

      const rows = historial
        .map((row) => {
          const rowData = Object.values(row)
            .map((value) => `<td>${value ?? ""}</td>`)
            .join("");
          return `<tr>${rowData}</tr>`;
        })
        .join("");

      const headers = Object.keys(historial[0])
        .map((header) => `<th>${header}</th>`)
        .join("");

      const tableHTML = `
                          <table border="1">
                            <thead>
                              <tr>${headers}</tr>
                            </thead>
                            <tbody>
                              ${rows}
                            </tbody>
                          </table>
                          `;

      data.tabla = tableHTML;
    } else if (CLAVE === "004") {
      data = await getIncidencia(ID);
    }

    filledTemplate = replacePlaceholders(plantilla[0].Body, data);
    const resultado = await enviaEmail(
      EMAIL,
      plantilla[0].Encabezado,
      filledTemplate
    );

    const responseData = utils.buildResponse(
      [],
      true,
      200,
      "Correo enviado con éxito"
    );

    res.status(200).json(responseData);
  } catch (error) {
    const responseData = utils.buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
};

module.exports = {
  sendEmail: sendEmailHandler,
};
