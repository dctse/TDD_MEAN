'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  EventSchema = new Schema({
      ratings: [],
      averageRating: Number
  });

EventSchema.methods.getTotalRating = function(){
    var totalRating = 0;

    _.each(this.ratings, function(item){
        totalRating += item.rating;
    });

    return totalRating;
};

EventSchema.methods.calculateAverageRating = function(){
    var totalRating = this.getTotalRating();

    if (this.ratings.length > 0 ) {
        this.averageRating = totalRating / this.ratings.length;
    } else {
        this.averageRating = 0;
    }
};
EventSchema.pre('save', function(next){
    this.calculateAverageRating();
    next();
});

module.exports = mongoose.model('Event', EventSchema);
