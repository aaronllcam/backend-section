const BaseRepository = require('./base.repository');
let _idea = null;
class IdeaRepository extends BaseRepository{

    constructor({ Idea }){
        supèr( Idea );
        _idea = Idea;
    }

    async getUserIdeas(author){
        return await _user.findOne({author});
    }

}

module.exports = IdeaRepository;