var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteDishSchema = new Schema({
  favDishes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  }
});

var favoriteSchema = new Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dishes: [favoriteDishSchema]
}, {
  timestamps: true
});

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;