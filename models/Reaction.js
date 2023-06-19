const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            // must be between 1 and 280 characters
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
    
);
// This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.

// export the Reaction model
module.exports = Reaction;






