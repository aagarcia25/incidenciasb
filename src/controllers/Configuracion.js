const utils = require("../utils/responseBuilder.js");


module.exports = {

createConfiguracion: async (req, res) =>{

    try {
        const{Nombre,Valor,Slug,Descripcion,IdUsuario}= req.body;
        const result = await utils.executeQuery("CALL sp_CrearParametro(?,?,?,?,?)", [
            Nombre,Valor,Slug,Descripcion,IdUsuario,
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
deleteConfiguracion: async (req, res) =>{

    try {
        const{IdParametro,IdUsuario}= req.body;

        const result = await utils.executeQuery("CALL sp_EliminarParametro(?,?)", [
            IdParametro,IdUsuario,
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
getConfiguraciones: async (req, res) =>{

    try {

        const result = await utils.executeQuery("CALL sp_ListaParametros()", [ ]);
  
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
editarConfiguracion: async (req, res) =>{


    try {
        const{IdParametro,Nombre,Valor,Slug,Descripcion,CHUSER}= req.body;

        const result = await utils.executeQuery("CALL sp_EditarParametro(?,?,?,?,?,?)", [
            IdParametro,Nombre,Valor,Slug,Descripcion,CHUSER]);
  
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
}