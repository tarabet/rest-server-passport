var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Favorites = require('../models/favorites');

var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.find({})
      //.populate('comments.postedBy')
      .exec(function(err, favorites) {
        if(err) throw err;
        res.json(favorites);
      })
  })

  .post(Verify.verifyOrdinaryUser, function(req, res, next){
    req.body.postedBy = req.decoded._doc._id;
    console.log('req.body.postedBy:', req.body.postedBy);
    Favorites.create(req.body, function(err, favorites) {
      if(err) throw err;
      res.json(favorites);

      //dish.comments.push(req.body);
      //dish.save(function(err, dish) {
      //  if(err) throw err;
      //  console.log('Comment added');
      //  res.json(dish);
      //})
      //
      //console.log('Dish added to favorites');
      //var id = dish._id;
      //res.writeHead(200, { 'Content-Type' : 'text/plain' });
      //res.end('Added the dish with id: ' + id);
    });
  })

  .delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Favorites.remove({}, function(err, resp) {
      if(err) throw err;
      res.json(resp);
    })
  });

favoritesRouter.route('/:dishObjectId')
  .delete(Verify.verifyOrdinaryUser, function(req, res, next){
    res.end('This is /:dishObjectId DELETE response');
    //Favorites.findByIdAndRemove(req.params.dishObjectId, function(err, resp) {
    //  if(err) throw err;
    //  res.json(resp);
    //})
  });

module.exports = favoritesRouter;

