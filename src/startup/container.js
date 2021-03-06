//Aqui configuramos nuestro contenedro de inyeccion de dependencias
//esto lo podemos hacer gracias a awilix
const { createContainer, asClass, asValue, asFunction } = require('awilix');

//Config
const config = require("../config")
const app = require(".")
//services
const { HomeService, CommentService, IdeaService, UserService, AuthService } = require('../services')

//controllers
const { HomeController, CommentController, IdeaController, UserController, AuthController } = require('../controllers')

//routes
const { HomeRoutes, CommentRoutes, IdeaRoutes, UserRoutes, AuthRoutes } = require('../routes/index.routes')
const Routes = require('../routes')

//repositories
const {CommentRepository, IdeaRepository, UserRepository} = require('../repositories');

//Models
const { User, Idea, Comment } = require('../models')

const container = createContainer();

container
.register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
})
.register({
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    CommentService: asClass(CommentService).singleton(),
    AuthService: asClass(AuthService).singleton()


}).register({
    HomeController: asClass(HomeController.bind()).singleton(),
    UserController: asClass(UserController.bind()).singleton(),
    IdeaController: asClass(IdeaController.bind()).singleton(), 
    CommentController: asClass(CommentController.bind()).singleton(),
    AuthController: asClass(AuthController.bind()).singleton(),
}).register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    IdeaRoutes: asFunction(IdeaRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton()
}).register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
}).register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton()
})

module.exports = container;