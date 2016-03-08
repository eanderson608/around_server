/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Photo from '../api/photo/photo.model';

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

Photo.find({}).removeAsync()
  .then(() => {
    Photo.createAsync({
      name: 'photo1',
      description: 'awesome selfie',
    }, {
      name: 'photo2',
      description: 'picture of dog',
    })
    .then(() => {
      console.log('finished populating photos');
    });
  });
