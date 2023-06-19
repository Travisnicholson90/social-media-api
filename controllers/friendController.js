const { ObjectId } = require('mongodb');
const Thought = require('../models/Thought');
const User = require('../models/User');

// post a new friend to a user's friend list
const postFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id }, // find user by id
            { $addToSet: { friends: req.params.friendId } }, // add friend to user
            { runValidators: true, new: true } // return updated user
        );

        if ( !user ) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

//delete a friend from a user's friend list
const deleteFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id }, // find user by id
            { $pull: { friends: req.params.friendId } }, // remove friend from user
            { runValidators: true, new: true } // return updated user
        );

        if ( !user ) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json({ message: 'Friend deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { postFriend, deleteFriend };