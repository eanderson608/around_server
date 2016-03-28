'use strict';

var express = require('express');
var controller = require('./photo.controller');
var multer = require('multer');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id/increment', controller.incrementVoteAndScore);
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
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

router.post('/uploads', upload.single('file'), function (req, res) {

    var multiparty = require('multiparty');
    var util = require('util');
    var fs = require('fs');

    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
  		res.writeHead(200, {'content-type': 'text/plain'});
  		res.write('received upload:\n\n');
  		res.end(util.inspect({fields: fields, files: files}));
  		
	});
    console.log(req.file);

    // rename file
    var tmp_path = req.file.path;
    var target_path = './uploads/' + req.body.fileName;
    console.log(target_path);

    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
        });
    });

	return;
  
});

module.exports = router;
