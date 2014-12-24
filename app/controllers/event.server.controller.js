'use strict';

var mongoose = require('mongoose'),
  EventModel = mongoose.model('Event');

var sendBackData = function(res, err, data){
    if (err) {
        res.send(500);
    } else {
        if (data) {
            res.send(200, data);
        } else {
            res.send(404);
        }
    }
};

exports.getAllEvents = function(req, res) {
    EventModel.find(function(err, data){
        sendBackData(res, err, data);
    });
};

exports.findSingle = function(req, res) {
    EventModel.findByID(req.params.id, function(err, data){
        sendBackData(res, err, data);
    });
};

exports.addEvent = function(req, res) {
    if(!req.body.name){
        res.send(403);
    }

    if(req.body.eventType === 1 && !req.body.frequency){
        res.send(403);
    }

    var promise = EventModel.create(req.body);

    promise.then(function(){
        res.send(200);
    }, function(){
       res.send(500);
    });
};

//to be re-write using TDD
exports.updateEvent = function(req, res) {
    EventModel.findByID(req.params.id, function(err,data){
        data.name = req.body.name;
        data.description = req.body.description;
        data.frequency = req.body.frequency;

        data.save(function(e, eventModel, numberaffected){
            if (e) {
                res.send(500);
            } else {
                res.send(200, eventModel);
            }
        });
    });

};

