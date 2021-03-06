//este archivo es nuestro router principal
//el encargado de configurar toddas las rutas

const express = require("express");
const cors = require('cors'); //varias configuracions deconectividad
const helmet = require('helmet'); //seguridad por defecto.
const compression = require("compression"); //nos ayuda a comprimir las peticiones http ara que sea mas rapìda
require("express-async-errors")  //nos ayuda a capturar en un middleware las excepciones asincronas que producen las promesas normalmente
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');
const { UserRoutes } = require("./index.routes");
const ideaRoutes = require("./idea.routes");
const commentRoutes = require("./comment.routes");
const swaggerUI = require('swagger-ui-express');
const { SWAGGER_PATH } = require('../config');
const swaggerDocument = require(SWAGGER_PATH);

//funcion que va a requerir las rutas necesarias:
module.exports = function({ 
    HomeRoutes,
    IdeaRoutes,
    CommentRoutes,
    UserRoutes,
    AuthRoutes
}){

    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());
    
    
    apiRoutes.use("/home", HomeRoutes);
    apiRoutes.use("/user", UserRoutes);
    apiRoutes.use("/idea", IdeaRoutes);
    apiRoutes.use("/comment", CommentRoutes);
    apiRoutes.use("/auth", AuthRoutes);


    router.use("/v1/api", apiRoutes); //esto lo hacemos para que nuestrso end points tengan este prefijo '/v1/api'
    router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);
    
    return router;

}