const utils = require("../utils/responseBuilder.js");

module.exports = {
  createIncidencias: async (req, res) => {
    try {
      const {
        Estatus,
        TextoInc,
        NombreRegistra,
        EmailRegistra,
        IdUsuario,
        ID,
      } = req.body;
      const result = await utils.executeQuery(
        "CALL sp_CrearIncidencia(?,?,?,?,?,?)",
        [Estatus, TextoInc, NombreRegistra, EmailRegistra, IdUsuario, ID]
      );

      if (result.length > 2) {
        const data = result;
        const responseData = utils.buildResponse(
          data[0],
          true,
          data[1][0].Respuesta,
          data[1][0].Mensaje
        );
        res.status(200).json(responseData);
      } else {
        const responseData = utils.buildResponse(
          [],
          true,
          result[0][0].Respuesta,
          result[0][0].Mensaje
        );
        res.status(200).json(responseData);
      }
    } catch (error) {
      const responseData = utils.buildResponse(null, false, 500, error.message);
      res.status(500).json(responseData);
    }
  },
  deleteIncidencias: async (req, res) => {
    try {
      const { IdIncidencia, IdUsuario } = req.body;

      const result = await utils.executeQuery(
        "CALL sp_EliminarIncidencia(?,?)",
        [IdIncidencia, IdUsuario]
      );

      if (result.length > 2) {
        const data = result;
        const responseData = utils.buildResponse(
          data[0],
          true,
          data[1][0].Respuesta,
          data[1][0].Mensaje
        );
        res.status(200).json(responseData);
      } else {
        const responseData = utils.buildResponse(
          [],
          true,
          result[0][0].Respuesta,
          result[0][0].Mensaje
        );
        res.status(200).json(responseData);
      }
    } catch (error) {
      const responseData = utils.buildResponse(null, false, 500, error.message);
      res.status(500).json(responseData);
    }
  },

  getIncidenciasbyuser: async (req, res) => {
    try {
      const CHID = req.query.CHID;
      const result = await utils.executeQuery(
        "CALL sp_ListaIncidenciasbyUser(?)",
        [CHID]
      );

      if (result.length > 2) {
        const data = result;
        const responseData = utils.buildResponse(
          data[0],
          true,
          data[1][0].Respuesta,
          data[1][0].Mensaje
        );
        res.status(200).json(responseData);
      } else {
        const responseData = utils.buildResponse(
          [],
          true,
          result[0][0].Respuesta,
          result[0][0].Mensaje
        );
        res.status(200).json(responseData);
      }
    } catch (error) {
      const responseData = utils.buildResponse(null, false, 500, error.message);
      res.status(500).json(responseData);
    }
  },
  getIncidencias: async (req, res) => {
    try {
      const result = await utils.executeQuery("CALL sp_ListaIncidencias()", []);

      if (result.length > 2) {
        const data = result;
        const responseData = utils.buildResponse(
          data[0],
          true,
          data[1][0].Respuesta,
          data[1][0].Mensaje
        );
        res.status(200).json(responseData);
      } else {
        const responseData = utils.buildResponse(
          [],
          true,
          result[0][0].Respuesta,
          result[0][0].Mensaje
        );
        res.status(200).json(responseData);
      }
    } catch (error) {
      const responseData = utils.buildResponse(null, false, 500, error.message);
      res.status(500).json(responseData);
    }
  },
  editarIncidencias: async (req, res) => {
    try {
      const {
        CHID,
        Estatus,
        TextoInc,
        NombreRegistra,
        EmailRegistra,
        CHUSER,
        Observaciones,
        AsignadoA,
        Prioridades,
      } = req.body;

      const result = await utils.executeQuery(
        "CALL sp_EditarIncidencia(?,?,?,?,?,?,?,?,?)",
        [
          CHID,
          Estatus,
          TextoInc,
          NombreRegistra,
          EmailRegistra,
          CHUSER,
          Observaciones,
          AsignadoA,
          Prioridades,
        ]
      );

      if (result.length > 2) {
        const data = result;
        const responseData = utils.buildResponse(
          data[0],
          true,
          data[1][0].Respuesta,
          data[1][0].Mensaje
        );
        res.status(200).json(responseData);
      } else {
        const responseData = utils.buildResponse(
          [],
          true,
          result[0][0].Respuesta,
          result[0][0].Mensaje
        );
        res.status(200).json(responseData);
      }
    } catch (error) {
      const responseData = utils.buildResponse(null, false, 500, error.message);
      res.status(500).json(responseData);
    }
  },
  getHistorial: async (req, res) => {
    try {
      const IdIncidencia = req.query.IdIncidencia;
      const result = await utils.executeQuery("CALL sp_ListaHistorial(?)", [
        IdIncidencia,
      ]);

      if (result.length > 2) {
        const data = result;
        const responseData = utils.buildResponse(
          data[0],
          true,
          data[1][0].Respuesta,
          data[1][0].Mensaje
        );
        res.status(200).json(responseData);
      } else {
        const responseData = utils.buildResponse(
          [],
          true,
          result[0][0].Respuesta,
          result[0][0].Mensaje
        );
        res.status(200).json(responseData);
      }
    } catch (error) {
      const responseData = utils.buildResponse(null, false, 500, error.message);
      res.status(500).json(responseData);
    }
  },

  getIncidenciasCanceladas: async (req, res) => {
    try {
      const result = await utils.executeQuery(
        "CALL sp_ListaIncidenciasCanceladas()",
        []
      );

      if (result.length > 2) {
        const data = result;
        const responseData = utils.buildResponse(
          data[0],
          true,
          data[1][0].Respuesta,
          data[1][0].Mensaje
        );
        res.status(200).json(responseData);
      } else {
        const responseData = utils.buildResponse(
          [],
          true,
          result[0][0].Respuesta,
          result[0][0].Mensaje
        );
        res.status(200).json(responseData);
      }
    } catch (error) {
      const responseData = utils.buildResponse(null, false, 500, error.message);
      res.status(500).json(responseData);
    }
  },

  getIncidenciasResueltas: async (req, res) => {
    try {
      const result = await utils.executeQuery(
        "CALL sp_ListaIncidenciasResueltas()",
        []
      );

      if (result.length > 2) {
        const data = result;
        const responseData = utils.buildResponse(
          data[0],
          true,
          data[1][0].Respuesta,
          data[1][0].Mensaje
        );
        res.status(200).json(responseData);
      } else {
        const responseData = utils.buildResponse(
          [],
          true,
          result[0][0].Respuesta,
          result[0][0].Mensaje
        );
        res.status(200).json(responseData);
      }
    } catch (error) {
      const responseData = utils.buildResponse(null, false, 500, error.message);
      res.status(500).json(responseData);
    }
  },

  getIncidenciasPorValidar: async (req, res) => {
    try {
      const result = await utils.executeQuery(
        "CALL sp_ListaIncidenciasPorValidar()",
        []
      );

      if (result.length > 2) {
        const data = result;
        const responseData = utils.buildResponse(
          data[0],
          true,
          data[1][0].Respuesta,
          data[1][0].Mensaje
        );
        res.status(200).json(responseData);
      } else {
        const responseData = utils.buildResponse(
          [],
          true,
          result[0][0].Respuesta,
          result[0][0].Mensaje
        );
        res.status(200).json(responseData);
      }
    } catch (error) {
      const responseData = utils.buildResponse(null, false, 500, error.message);
      res.status(500).json(responseData);
    }
  },
};
