const BaseService = require("./base.service");

let _commentRepository = null;
let _ideaRepository = null;

class CommentService extends BaseService{

    constructor( { CommentRepository, IdeaRepository }){
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _ideaRepository = IdeaRepository;
    }

    //get los comentarios de una idea
    async getCommentsfromIdea(ideaId){
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

        const { comments } = idea;
        return comments;
    }
    //añade el comentario a un idea, lo sube a mongoDB
    async createComment(comment, ideaId){
        
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

        const createdComment = await _commentRepository.create(comment);
        idea.comments.push(createdComment);

        return await _ideaRepository.update(ideaId, { comments: idea.comments });
    }
}

module.exports = CommentService;