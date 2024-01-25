const { Thought } = require('../models');

const createReaction = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedThought);
  } catch (error) {
    console.log(error);
  }
};

const removeReaction = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedThought);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createReaction,
  removeReaction,
};
