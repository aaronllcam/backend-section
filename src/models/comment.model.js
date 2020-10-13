const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    comment: {type: String, required: true},
    description: {type: String},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: true  //para que cada vez que tarigamos un aidea nos traiga la info de su autor!
    }
})

CommentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('comment', CommentSchema);