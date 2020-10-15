const { Router } = require("express");
const { ParseIntMiddleware } = require('../middlewares');


module.exports = function({ IdeaController }){
    const router = Router();

    
    router.get("/", [ParseIntMiddleware], IdeaController.getAll);
    router.get("/:userId", IdeaController.get);
    router.post("", IdeaController.create);
    router.patch("/:ideaId", IdeaController.update);
    router.delete("/:ideaId", IdeaController.delete);
    router.post(":ideaId/upvote", IdeaController.upvotedIdea);
    router.post(":ideaId/downvote", IdeaController.downvotedIdea);

    
    return router;
}
