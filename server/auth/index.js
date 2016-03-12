'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';

// Passport Configuration
require('./facebook/passport').setup(User, config);

var router = express.Router();

router.use('/facebook', require('./facebook'));

export default router;
