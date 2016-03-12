'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('facebook-token', function(req, res) {
      // do something with req.user
      res.send(req.user? 200 : 401);
    }
  )});

export default router;
