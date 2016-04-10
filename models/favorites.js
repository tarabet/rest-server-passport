var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Sorry, could not find the way to create Schema for dish._id population
//
//var favoriteDish = new Schema({
//  dish: {
//    type: mongoose.Schema.Types.ObjectId,
//    ref: 'Dish'
//  }
//});

/**
 * PLEASE, USE {"dishes" : "some_dish_id"} POST request to add a dish to favorites!!!
 */

var favoriteSchema = new Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dishes: []
}, {
  timestamps: true
});

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;