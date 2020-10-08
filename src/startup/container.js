//Aqui configuramos nuestro contenedro de inyeccion de dependencias
//esto lo podemos hacer gracias a awilix
const { createContainer, asClass, asValue, asFunction } = require('awilix');

//Config
const config = require("../config")
const app = require(".")
//services
const { HomeService } = require('../services')

//controllers
const { HomeController } = require('../controllers')

//routes
const { HomeRoutes } = require('../routes/index.routes')
const Routes = require('../routes')

const container = createContainer();

container
.register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
})
.register({
    HomeService: asClass(HomeService).singleton()
}).register({
    HomeController: asClass(HomeController.bind()).singleton()
}).register({
    HomeRoutes: asFunction(HomeRoutes).singleton()
})

module.exports = container;