const router = require('express').Router();
const {
  getAllThoughts,
  getThought,
  createThought,
  deleteThought,
  updateThought,
} = require('../../controllers/thoughtController');

const {
  createReaction,
  removeReaction,
} = require('../../controllers/reactionController');

// /api/thoughts
router.route('/').post(createThought).get(getAllThoughts);

// /api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// /api/users/:thoughtId
router
  .route('/:thoughtId')
  .get(getThought)
  .delete(deleteThought)
  .post(createReaction)
  .put(updateThought);

module.exports = router;
