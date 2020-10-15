//nos ayuda a castear los query-strings a tipo numericos
//Ejemplo:
//  ...api.com?pageNum=5   --> el numero 5 viaja dentro de un objeto como un string y nosotros necesitamos parsearlo a entero
//  { pageNum: '5' }

module.exports = (req, res, next) => {
    const queryString = req.query;

    for(const key in queryString){
        const length = queryString[key].length;
        //explicacion isValid: ponemos que tiene que ser menor a 20 par que no se confunda con un id de mongo, que normalmente es mayor a >20 caracteres
        //me imagino que si trabajamos con id de todos los tamaños esto no nos sirve.
        const isValid = length > 20 ? false : true;
        if(isValid){
            queryString[key] =  parseInt(queryString[key]);
        }
    
    }
    //lo volvemos a asociar a la request pero con los elemnetos que toque parseados a enteros
    req.queryString = queryString;
    next();
}
