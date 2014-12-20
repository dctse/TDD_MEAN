'use strict';

var mongoose = require('mongoose'),
  EventModel = mongoose.model('Event');

exports.getAllEvents = function(req, res) {
    EventModel.find(function(err, data){
        res.send(200, data);
    });

};
