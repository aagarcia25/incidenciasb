const pdf = require('html-pdf');

function generatePDF(data) {
  console.log("informacion pdf",data);
  return new Promise((resolve, reject) => {
    const content = `
      <html>
      <head>
    <meta charset="UTF-8">
    <title>Reporte de Incidencia</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px; /* Márgenes de 20px en los cuatro lados */
        }
        .container {
            width: calc(100% - 40px); /* Reducir el ancho para compensar el margen */
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 8px;
            background-color: #f9f9f9;
            box-sizing: border-box; /* Para incluir el padding dentro del ancho total */
            margin: 0 auto; /* Centramos el contenedor si no está ocupando todo el ancho */
        }
        .field {
            margin-bottom: 10px;
        }
        .field label {
            font-weight: bold;
        }
        .description, .notes {
            width: calc(100% - 20px); /* Reducir el ancho para compensar el margen */
            min-height: 100px;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 4px;
            background-color: #fff;
            margin: 10px 0; /* Márgenes adicionales */
            overflow: hidden; /* Para evitar que el contenido se salga del cuadro */
        }
        .notes {
            min-height: 150px;
        }
        .description img, .notes img {
            max-width: 100%; /* Ajustar el ancho máximo al 100% del contenedor */
            height: auto; /* Ajustar la altura automáticamente para mantener la proporción */
            display: block; /* Asegurar que la imagen se muestre como bloque */
            object-fit: contain; /* Asegurar que la imagen se contenga dentro del contenedor */
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Reporte de Incidencia</h1>

        <div class="field">
            <label>Estado Actual de la Incidencia:</label>
            <span>${data.ceDescripcion}</span>
        </div>

        <div class="field">
            <label>Registrado por:</label>
            <span>${data.NombreRegistra}</span>
        </div>

        <div class="field">
            <label>Asignado a:</label>
            <span>${data.asignadoa}</span>
        </div>

        <div class="field">
            <label>Prioridad:</label>
            <span>${data.prDescripcion}</span>
        </div>

        <div class="field">
            <label>Correo Electrónico del Registrante:</label>
            <span>${data.EmailRegistra}</span>
        </div>

        <div class="field">
            <label>Descripción de la Incidencia:</label>
            <div class="description">
                ${data.TextoInc}
            </div>
        </div>

        <div class="field">
            <label>Historial de Notas:</label>
            <div class="notes">
                ${data.HistorialObservaciones}
            </div>
        </div>
    </div>
</body>
      </html>
    `;

    pdf.create(content).toFile('reporte.pdf', (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
}

module.exports = { generatePDF };
