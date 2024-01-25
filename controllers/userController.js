const { User, Thought } = require('../models');

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: `new user can't be created!`, error });
  }
};

const getUser = async (req, res) => {
  try {
    const singleUser = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends');
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(404).json({ msg: `No users found ` });
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ msg: `No users found of this id`, error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete({
      _id: req.params.userId,
    });
    const deletedThoughts = await Thought.deleteMany({
      _id: { $in: deletedUser.thoughts },
    });
    res.status(200).json({
      message: 'user and associated thoughts deleted!',
      deletedUser,
      deletedThoughts,
    });
  } catch (err) {
    res
      .status(404)
      .json({ msg: `No users found with id: ${req.params.userId}` });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ msg: `No users found with this id`, err: err });
  }
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
};
