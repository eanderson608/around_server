'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PhotoSchema = new mongoose.Schema({
  userId: String,
  filename: String,
  upvotes: Number,
  downvotes: Number,
  timeStamp: Number,
  location: {
    type: [Number],  
    index: '2dsphere'
    }
});

export default mongoose.model('Photo', PhotoSchema);
