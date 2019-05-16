const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  createdOn: {
    type: Date,
    'default': Date.now
  },
  commentText: {
    type: String,
    required: true
  }
})

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  comments: [commentSchema]
});

mongoose.model('Thread', threadSchema);