'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PhotoSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  fileName: String,
  upvotes: Number,
  downvotes: Number,
  score: Number,
  time: Number,
  location: {
    type: [Number],  
    index: '2dsphere'
    }
});

export default mongoose.model('Photo', PhotoSchema);
