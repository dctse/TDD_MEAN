/**
 * Created by Danny Tse on 12/24/2014.
 */

'use strict';
var app = angular.module('ratings');

function controller($scope, $state, eventsService){
    $scope.loading = true;

    $scope.getEvent = function(id){
        eventsService.getSingleEvent(id)
            .then(function(event){
                $scope.eventDetails = event;
            })
            .finally(function(){
                $scope.loading = false;
            });

    };

//    $scope.selectEvent = function(id){
//        $state.go('eventDetails', {eventId: id});
//    };

    $scope.getEvent();
}

app.controller('EventDetailController', ['$scope', '$state', 'EventsService', controller]);
