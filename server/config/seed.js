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
      userId: '8000',
      name: 'Yolo Swag',
      firstName: 'Yolo',
      lastName: 'Swag',
      authToken: '342'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

Photo.find({}).removeAsync()
  .then(() => {
    Photo.createAsync({
      userId: '8000',
      filename: "String",
      upvotes: 0,
      downvotes: 0,
      score: 0,
      time: 6565,
      location: [0, 0]
    }, {
      userId: '34343',
      filename: "String",
      upvotes: 0,
      downvotes: 0,
      score: 0,
      time: 455599,
      location: [-89.0, 43.0]
    })
    .then(() => {
      console.log('finished populating photos');
    });
  });


