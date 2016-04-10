var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Favorites = require('../models/favorites');

var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    req.body.postedBy = req.decoded._doc._id;
    Favorites.findOne({ postedBy : req.body.postedBy })
      .populate('postedBy')
      .exec(function(err, favorites) {
        if(err) throw err;
        res.json(favorites);
      })
  })

  .post(Verify.verifyOrdinaryUser, function(req, res, next){
    req.body.postedBy = req.decoded._doc._id;
    Favorites.findOne({ postedBy : req.body.postedBy }, function(err, favorite) {
      if (err) {
        throw err;
      } else if (!favorite) {
        Favorites.create(req.body, function (err, favorites) {
          if (err) throw err;
          res.json(favorites);
        })
      } else {
        if (favorite.dishes.indexOf(req.body.dishes) !== -1) {
          res.end('Dish already in your favorites list')
        } else {
          favorite.dishes.push(req.body.dishes);
          favorite.save(function (err, favorite) {
            if (err) {
              res.end(err)
            } else {
              res.json(favorite)
            }
          });
        }
      }
    })
  })

  .delete(Verify.verifyOrdinaryUser, function(req, res, next){
    req.body.postedBy = req.decoded._doc._id;
    Favorites.remove({ postedBy : req.body.postedBy }, function(err, resp) {
      if(err) throw err;
      res.json(resp);
    })
  });

favoritesRouter.route('/:dishObjectId')
  .delete(Verify.verifyOrdinaryUser, function(req, res, next){
    req.body.postedBy = req.decoded._doc._id;
    Favorites.findOne({ postedBy : req.body.postedBy })
      .exec(function(err, favorites) {
        if(err) throw err;
        favorites.dishes.splice(favorites.dishes.indexOf(req.params.dishObjectId),1);
        favorites.save(function(err, favorites) {
          if(err) throw err;
          res.json(favorites);
        })
      });
  });

module.exports = favoritesRouter;

