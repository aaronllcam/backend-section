//nos indicara si el usuario esta ya o no logeado!!
//este middlewre se configura en las rutas que quramos proteger!!
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
 const token = req.headers['authoritazion'];
 if(!token){
     const error = new Error();
     error.status = 400;
     error.message = "Token mst be sent";
     throw error;
 }

 //validamos el token
 jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if(err){
        const error = new Error();
        error.status = 401;
        error.message = "Invalid Token";
        throw error;
    }

    req.user = decodedToken.user;
    next();

 })
}