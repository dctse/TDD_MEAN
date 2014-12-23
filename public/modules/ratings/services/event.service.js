/**
 * Created by Danny Tse on 12/23/2014.
 */
'use strict';

var app = angular.module('ratings');

function eventsService ($resource, $q){

    function getData(route, method){
        var deferred = $q.defer();
        var addr = ['http://localhost:3000/events',
            route].join('/');

        $resource(addr)[method]()
            .$promise
            .then(function(data){
                deferred.resolve(data);
            })
            .catch(function(error){
                deferred.reject(error);
            });

        return deferred.promise;
    }

    return {
        getAllEvents: function() {
            return getData('', 'query');
        },

        getSingleEvent: function(id){
            return getData(id, 'get');
        }
    };
}

app.factory('EventsService', ['$resource', '$q', eventsService]);

