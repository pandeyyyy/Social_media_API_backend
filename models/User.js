const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    username: {
      type: String,
      required: [true, 'Enter name'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Enter email'],
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        'Enter valid email',
      ],
      unique: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


module.exports = model('user', userSchema);
