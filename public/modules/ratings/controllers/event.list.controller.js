/**
 * Created by Danny Tse on 12/23/2014.
 */
'use strict';
var app = angular.module('ratings');

function controller($scope, eventsService){
    $scope.getAllEvents = function(){
        eventsService.getAllEvents().then(function(events){
            $scope.events = events;
        });

    };
}

app.controller('EventListController', ['$scope', 'EventsService', controller]);