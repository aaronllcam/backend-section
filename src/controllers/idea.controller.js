
let _ideaService = null;
class IdeaController{

    constructor( { IdeaService }){

        _ideaService = IdeaService;
    }

    async get(req, res){

        const { userId } = req.params;
        const user = await _ideaService.get(userId);
        return res.send(user);
    }

    async getAll(req, res){
        const { pageSize, pageNum } = req.query;
        const ideas = await _ideaService.getAll(pageSize, pageNum);
        return res.send(ideas);
    }
    async create(req, res){
        const { body } = req;
        const createdIdea = await _ideaService.create(body);
        return res.status(201).send(createdIdea);
    }

    async update(req, res){
        const { body } = req; 
        const { ideaId } = req.params;
        const updatedIdea = await _ideaService.update(ideaId, body);
        return await res.send(updatedIdea);
    }

    async delete(req, res){
        const { ideaId } = req.params;
        const deletedIdea = await _ideaService.delete(ideaId);
        return res.send(deletedIdea);
    }

    async getUsersIdeas(req, res){

        const { userId } = req.params;
        const userIdeas = await _ideaService.getUsersIdeas(userId);
        return res.send(userIdeas);

    }

    async upvotedIdea(req, res){
        const { ideaId } = req.params;
        const idea = await _ideaService.updatedIdea(ideaId);
        return res.send(idea);

    }
    async downvotedIdea(req, res){
        const { ideaId } = req.params;
        const idea = await _ideaService.downvotedIdea(ideaId);
        return res.send(idea);

    }

}

module.exports = IdeaController;