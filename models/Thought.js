const { Schema, Types, model } = require('mongoose');
const formatDate = require('../utils/helpers');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) =>
        formatDate(
          Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).format(new Date(createdAt))
        ),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 300,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, 'Please enter name'],
      minlength: 1,
      maxlength: 300,
    },
    username: {
      type: String,
      required: [true, 'Please enter username'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (createdAt) =>
        formatDate(
          Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).format(new Date(createdAt))
        ),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
     
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


module.exports = model('thought', thoughtSchema);
