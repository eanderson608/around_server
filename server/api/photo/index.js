'use strict';

var express = require('express');
var controller = require('./photo.controller');
var multer = require('multer');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);


// Handle photo image storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + '.jpg')
  }
})

var upload = multer({ storage: storage })

router.post('/uploads', upload.single('file'), function (req, res) {

    var multiparty = require('multiparty');
    var util = require('util');

    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
  		res.writeHead(200, {'content-type': 'text/plain'});
  		res.write('received upload:\n\n');
  		res.end(util.inspect({fields: fields, files: files}));
  		
	});
    console.log(req.file);

	return;
  
});

module.exports = router;
