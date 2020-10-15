const mcache = require('memory-cache');
const { CACHE_KEY } = require('../config');

module.exports = (duration) => {
    return (req, res, next) => {
        //creamos un identificado unico de la siguiente manera.
        const key = CACHE_KEY + (req.baseUrl || req.url);
        const cachedBody = mcache.get(key); //lo usamos para ver si existe una cache ya cread con este identificador
        
        if(cachedBody){
            return res.send(JSON.parse(cachedBody));
        }else{
            //vamos a sobreescribir el metodo send de response.
            //es un truco, cuando hacemos un send se le metera una propiedad body con los datos de cahe, la insertamos en la cache
            res.sendResponse = res.send;
            res.send = body => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body);
            }
            next();
        }
    }
}