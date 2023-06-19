const { ObjectId } = require('mongodb');
const Thought = require('../models/Thought');
const User = require('../models/User');

// get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // find all users
        res.json(users); // return all users
    } catch (err) {
        res.status(500).json(err);
    }
};

// get single user by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findOne ({ _id: req.params.id }) // find user by id
        // exclude the __v property
        .select('-__v')
        
        if ( !user ) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

//create a new user 
const postUser = async (req, res) => {
    try {
        const user = await User.create(req.body); // create user
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// update a user by id
const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id }, // find user by id
            { $set: req.body }, // update user
            { runValidators: true, new: true }
        );

        if ( !user ) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// delete a user by id
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });

        if ( !user ) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json({ message: 'User deleted!'});
    } catch (err) {
        res.status(500).json(err);
    }
};


const postThoughtToUser = async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id }, // find user by id
        { $addToSet: { thoughts: req.body } }, // add thought to user
        { runValidators: true, new: true } // return updated user
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };

module.exports = { getUsers, getUserById, postUser, updateUser, deleteUser, postThoughtToUser };
