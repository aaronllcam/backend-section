class BaseService{
     constructor( repository ){
        this.repository = repository;
     }

     async get(id){
        //si id no es enviado retornamos un bad request!!
        //estos errores los captura el middlewrer que hemos creado 
        if(!id){
            const error = new Error();
            error.status = 400;
            error.message = "id must be send";
            throw error;
        }

        const currentEntity = await this.repository.get(id);

        if(!currentEntity){
            const error = new Error();
            error.status = 404;
            error.message = "Entity not Found";
            throw error;
        }


        return currentEntity;
     }

     async getAll(){
         return await this.repository.getAll();
     }

     async create(entity){
         return await this.repository.create(entity);
     }
     async update(id, entity){

         if(!id){
             const error = new Error();
             error.status = 400;
             error.message = "id must be send";
             throw error;
         }

         return await this.repository.update(id, entity); 
     }

     async delete(id){

        if(!id){
            const error = new Error();
            error.status = 400;
            error.message = "id must be send";
            throw error;
        }

        return this.repository.delete(id);

     }
}

module.exports = BaseService;