//este archivo es nuestro router principal
//el encargado de configurar toddas las rutas

const express = require("express");
const cors = require('cors'); //varias configuracions deconectividad
const helmet = require('helmet'); //seguridad por defecto.
const compression = require("compression"); //nos ayuda a comprimir las peticiones http ara que sea mas rapìda
require("express-async-errors")  //nos ayuda a capturar en un middleware las excepciones asincronas que producen las promesas normalmente
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares')

//funcion que va a requerir las rutas necesarias:
module.exports = function({ HomeRoutes }){

    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());
    
    
    apiRoutes.use("/home", HomeRoutes);

    router.use("/v1/api", apiRoutes); //esto lo hacemos para que nuestrso end points tengan este prefijo '/v1/api'

    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);
    
    return router;

}