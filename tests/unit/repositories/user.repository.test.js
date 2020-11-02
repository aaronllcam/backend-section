const { UserRepository } = require('../../../src/repositories');
const { User } = require('../../../src/models');
const mockingoose = require('mockingoose').default;

let {  UserModelMock: { users, user } } = require('../../mocks');

//preparamos los tests de user repository. Usamos la sintaxis de JEST
describe("User Repository Test", () => {
    
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    })

    //preparamos nuestro primer test!
    it("Should return a user by id", async () => {

        const _user = {...user}; //creamos fortocopia de nuetro objeto user para no cambiarlo!
        delete _user.password;
        mockingoose(User).toReturn(user, "findOne");  //Del modelo User me vas a devolver el user cuando se invoque al metodo findOne, afin d ecuaentas se corresponde con el metodo que implementamos que s ellamam findById()

        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.get(_user._id);

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    })
    it("Should find a user by username", async () => {
        const _user = { ...user };
        delete _user.password;
        mockingoose(User).toReturn(user, "findOne");
    
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getUserByUsername(_user.username);
    
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
      });

    it("Should return a user collection", async () => {
      users = users.map(user => {
        delete user.password;
        return user;
      });
  
      mockingoose(User).toReturn(users, "find");
  
      const _userRepository = new UserRepository({ User });
      const expected = await _userRepository.getAll();

      expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users);
    });
  
    it("Should update an especific user by id", async () => {
      const _user = { ...user };
      delete _user.password;

      mockingoose(User).toReturn(_user, "findOneAndUpdate");

      const _userRepository = new UserRepository({ User });

      const expected = await _userRepository.update(user._id, {
        name: "Aaron"
      });
      expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });
  
    it("Should delete an especific user by id", async () => {

      mockingoose(User).toReturn(user, "findOneAndDelete");

      const _userRepository = new UserRepository({ User });
      const expected = await _userRepository.delete(user._id);

      expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    });


})