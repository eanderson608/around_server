/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/photo              ->  index
 * POST    /api/photo              ->  create
 * GET     /api/photo/:id          ->  show
 * PUT     /api/photo/:id          ->  update
 * DELETE  /api/photo/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Photo from './photo.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Photos within maxDistance of longitude and latitude params
// sorts by sortOn param.
export function index(req, res) {
  var sortOn = {};
  var coords = [];
  coords[0] = parseFloat(req.query.longitude) || 0; // set coords to 0 if not specified so
  coords[1] = parseFloat(req.query.latitude) || 0;  // a null pointer exception doesnt crash the server
  var maxDistance = parseInt(req.query.maxDistance);
  sortOn[req.query.sortOn] = -1;
  Photo.aggregate([{"$geoNear": 
                      {"near": {"type": "Point", "coordinates" : coords}, 
                      "distanceField": "distance", 
                      "maxDistance" : maxDistance, 
                      "spherical" : true}}, 
                    {"$sort" : sortOn}], 
  function(err, result){ 
    if(err) {
      res.send(err)
      return null;
    }
    res.send(result)
  });
}

// increments (by a positive or negative number) either upvotes or downvotes, and score field.
export function incrementVoteAndScore(req, res) {
  var inc = {};
  inc[req.query.field] = req.query.amount;
  if (req.query.field == "downvotes") inc["score"] = -req.query.amount;
  else inc["score"] = req.query.amount;

  Photo.findByIdAndUpdateAsync(req.params.id, {$inc : inc})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Photo from the DB
export function show(req, res) {
  Photo.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Photo in the DB
export function create(req, res) {
  Photo.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Photo in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Photo.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Photo from the DB
export function destroy(req, res) {
  Photo.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
