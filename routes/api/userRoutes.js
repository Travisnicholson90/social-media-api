const router = require('express').Router();

const { getUsers, 
    getUserById, 
    postUser, 
    updateUser, 
    deleteUser
} = require('../../controllers/userController');

const { 
    postFriend,
    deleteFriend, 
} = require('../../controllers/friendController');

// ---- users ----

// GET api/users
router.route('/').get(getUsers);

// api/users/:id
router.route('/:id').get(getUserById);

// POST api/users
router.route('/').post(postUser);
/*{"username": "", "email": ""}*/

// PUT api/users/:id
router.route('/:id').put(updateUser);
/*{"username": "", "email": ""}*/

// DELETE api/users/:id
router.route('/:id').delete(deleteUser);

// ---- friends ----

// POST api/users/userId/friends/:friendId
router.route('/:id/friends/:friendId').post(postFriend);

// DELETE api/users/userId/friends/:friendId
router.route('/:id/friends/:friendId').delete(deleteFriend);


module.exports = router;