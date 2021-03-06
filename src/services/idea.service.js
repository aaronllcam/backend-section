const BaseService = require("./base.service");

let _ideaRepository = null;

class IdeaService extends BaseService{

    constructor( { IdeaRepository }){
        super(IdeaRepository);
        _ideaRepository = IdeaRepository;
    }

    async getUserIdeas(author){
        if(!author){
            const error = new Error();
            error.status = 400;
            error.message ="userId - Author must be send";
            throw error;
        }
        return await _ideaRepository.getUserIdeas(author);
    }

    async upvotedIdea(ideaId){
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "ideaID must be passed as parameter";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);

        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "idea doesn t exist";
            throw error;
        }

        idea.upvotes.push(true);

        return _ideaRepository.update(ideaId, { upvotes: idea.upvotes });
    }

    async downvotedIdea(ideaId){
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "ideaID must be given";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);

        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "idea not FOund";
            throw error;
        }

        idea.downvotes.push(true);

        return await _ideaRepository.update(ideaId, { downvotes: idea.downvotes });
    }
}

module.exports = IdeaService;