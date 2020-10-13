const mongoose = require('mongoose');
const { Schema } = mongoose;

const IdeaSchema = new Schema({
    idea: {type: String, required: true},
    description: {type: String},
    upvotes: [{type: Boolean}],
    downvotes: [{type: Boolean}],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: true  //para que cada vez que tarigamos un aidea nos traiga la info de su autor!
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment',
        required: true,
        autopopulate: true  //para que cada vez que tarigamos un aidea nos traiga la info de su comentarios!
    }]
})

IdeaSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('idea', IdeaSchema);