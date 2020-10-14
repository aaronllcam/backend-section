const { JwtHelper } = require('../helpers');
let _userService = null;

class AuthService{
     
    constructor( { UserService }){
        _userService = UserService;
    }

    //metodo para crear usuario!!
    async signUp(user){
        const { username } = user;
        const userExist = await _userService.getUserByUsername(username);
        if(userExist){
            const error = new Error();
            error.status = 401;
            error.message = "user already exist";
            throw error;
        }

        return await _userService.create(user);
    }

    //metodo para logear un usuario que ya existe
    async signIn(user){
        const { username, password } = user;
        const userExist = await _userService.getUserByUsername(username);

        if(!userExist){
            const error = new Error();
            error.status = 404;
            error.message = "user does not exist";
            throw error;
        }

        const validPassword = userExist.comparePassword(password);
        if(!validPassword){
            const error = new Error();
            error.status = 401;
            error.message = "Password is not valid";
            throw error;
        }
        const userToEncode = {
            username: userExist.username,
            id: userExist._id
        };

        const token = JwtHelper.generateToken(userToEncode);

        return {token: token, user: userExist}
    }
}

module.exports = AuthService;