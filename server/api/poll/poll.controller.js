/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /polls              ->  index
 * POST    /polls              ->  create
 * GET     /polls/:id          ->  show
 * PUT     /polls/:id          ->  update
 * DELETE  /polls/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');
var User = require('../user/user.model');

// Get list of polls
exports.index = function(req, res) {
  Poll.find(function (err, polls) {
    if(err) { return handleError(res, err); }
    return res.json(200, polls);
  });
};

// Get a single poll
exports.show = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    return res.json(poll);
  });
};

// Get a single user's polls
exports.showUser = function(req, res) {
  Poll.findByOwner(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    return res.json(poll);
  });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  //console.log(req.body);
  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.json(201, poll);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    //var updated = _.merge(poll, req.body);
    poll.member.push(req.body.voter);
    vote(req.body.descion, poll.option);
    
    poll.markModified("member");
    poll.markModified("option");
    poll.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, poll);
    });
    return poll;
  });
};

function vote(target, array){
  for(var i=0; i< array.length; i++){
    if(array[i].name === target){
      array[i].count++;
      break;
    }
  }
}

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}