const { ObjectId } = require('mongodb');
const Thought = require('../models/Thought');
const User = require('../models/User');

// get all thoughts 
const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find(); // find all thoughts
        res.json(thoughts); // 
    } catch (err) {
        res.status(500).json(err);
    }
};


// get a single thought by id 
const getThoughtsById = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.id }) // find thought by id
        // exclude the __v property
        .select('-__v')

        if ( !thought ) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// post a thought
const postThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body); // create thought
        
        // push created thought's _id to associated user's thoughts array field
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId }, // find user by id
            { $push: { thoughts: thought._id } }, // add thought to user
            { runValidators: true, new: true } // return updated user
        );

        if ( !user ) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json({ message: 'Thought created!' });
    } catch (err) {
        res.status(500).json(err);
    }
};

// update a thought by thought id 
const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id }, // find thought by id
            { $set: req.body }, // update thought
            { runValidators: true, new: true }
        );

        if ( !thought ) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// delete a thought by thought id
const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId }); // find thought by id

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }

        // Remove thought from the associated user's thoughts array
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId }, // find user by id
            { $pull: { thoughts: req.params.thoughtId } }, // remove thought from user
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json({ message: 'Thought deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports = { getThoughts, getThoughtsById, postThought, updateThought, deleteThought };