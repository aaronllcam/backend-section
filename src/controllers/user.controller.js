
let _userService = null;
class UserController{

    constructor( { UserService }){

        _userService = UserService;
    }

    async get(req, res){

        const { userId } = req.params;
        const user = await _userService.get(userId);
        return res.send(user);
    }

    async getAll(req, res){
        const { pageSize, pageNum } = req.query;
        const users = await _userService.getAll(pageSize, pageNum);  //si no le paso nada coge por defecto las entradas del getall de baseRepository
        return res.send(users);
    }

    async update(req, res){
        const { body } = req; 
        const { userId } = req.params;
        const updatedUser = _userService.update(userId, body);
        return await res.send(updatedUser);
    }

    async delete(req, res){
        const { userId } = req.params;
        const deletedUser = _userService.delete(userId);
        return res.send(deletedUser);
    }

}

module.exports = UserController;