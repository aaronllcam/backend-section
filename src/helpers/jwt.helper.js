const { sign } = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

//estamos exportando la funcionalidad de un objeto, lo podemos hacer así.
//aqui usamos la funcion sign del paquete jsonwebtoken que usaremos posteriormente en un servicio y/o controlador
module.exports.generateToken = function(user){
    return sign({user}, JWT_SECRET, {expiresIn: "4h"});
}