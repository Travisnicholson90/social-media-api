const { Schema, model, Types } = require('mongoose');
const Thought = require('./Thought');

//schema to create a user
const userSchema = new Schema(
    {
        username: { 
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            //validate email
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    //set this to use virtual below
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//get total count of friends on retrieval
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
}
);

//create the User model using the userSchema
const User = model('User', userSchema);

//export the User model
module.exports = User;



