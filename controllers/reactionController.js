const { ObjectId } = require('mongodb');
const Thought = require('../models/Thought');
const User = require('../models/User');

//post a reaction to a thought
const postReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, // find thought by id
            { $addToSet: { reactions: req.body } }, // add reaction to thought
            { runValidators: true, new: true } // return updated thought
        );

        if ( !thought ) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.json({ message: 'Reaction added!' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// delete a reaction from a thought
const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, // find thought by id
            { $pull: { reactions: { reactionId: req.params._id } } }, // remove reaction from thought
            { runValidators: true, new: true } // return updated thought
        );
            
        if ( !thought ) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.json({ message: 'Reaction deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { postReaction, deleteReaction };