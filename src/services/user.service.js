const BaseService = require("./base.service");

let _userRepository = null; 
class UserService extends BaseService{

    constructor( { UserRepository } ){
        super( UserRepository );
        _userRepository = UserRepository;
    }
    async getUserByUsername(username){
        if(!username){
            const error = new Error();
            error.status = 400;
            error.message = "username must be passed as parameter";
            throw error;
        }

        return await _userRepository.getUserByUsername(username);
    }


}

module.exports = UserService;