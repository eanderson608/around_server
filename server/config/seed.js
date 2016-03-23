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
      timeStamp: 6565,
    })
    .then(() => {
      console.log('finished populating photos');
    });
  });


