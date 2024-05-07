const utils = require("../utils/responseBuilder.js");

module.exports = {
  getEstado: async (req, res) => {
    try {
      const result = await utils.executeQuery("CALL sp_ListaEstado()", []);

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
  getUsuarioInci: async (req, res) => {
    try {
      const result = await utils.executeQuery(
        "CALL sp_ListaUsuariosInci()",
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
  getPrioridad: async (req, res) => {
    try {
      const result = await utils.executeQuery("CALL sp_ListaPrioridad()", []);

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
  getEstadoNext: async (req, res) => {
    try {
      const TIPO = req.query.TIPO;
      console.log(TIPO);
      const result = await utils.executeQuery("CALL sp_ListaEstadoNext(?)", [
        TIPO,
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

  getSLA: async (req, res) => {
    try {
      const CHID = req.query.CHID;
      console.log(CHID);
      const result = await utils.executeQuery("CALL sp_SLA(?)", [CHID]);
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
