const router = require('express').Router();

const { 
    getThoughts, 
    getThoughtsById, 
    postThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');

const { 
    postReaction,
    deleteReaction
 } = require('../../controllers/reactionController');


// GET api/thoughts
router.route('/').get(getThoughts);

// GET api/thoughts/:id
router.route('/:id').get(getThoughtsById);

// POST api/thoughts/:userId
router.route('/').post(postThought);

// PUT api/thoughts/:id
router.route('/:id').put(updateThought);

// DELETE api/thoughts/:id(user id)/:thoughtId(thought id)
router.route('/:userId/:thoughtId').delete(deleteThought);

// POST api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(postReaction);
/*{"reactionBody": "", "username": ""}*/

// DELETE api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;