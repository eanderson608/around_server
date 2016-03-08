'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PhotoSchema = new mongoose.Schema({
  name: String,
  description: String,
});

export default mongoose.model('Photo', PhotoSchema);
