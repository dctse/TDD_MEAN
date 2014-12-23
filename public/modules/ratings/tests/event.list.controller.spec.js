/**
 * Created by Danny Tse on 12/23/2014.
 */

'use strict';

describe('Event List Viewer', function(){
    var EventsService,
      $q,
      scope,
      $rootScope;

    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(module(function($provide) {
        EventsService = {
            getAllEvents: function(){}
        };

        $provide.value('EventsService', EventsService);
    }));

    beforeEach(inject(function(_$rootScope_, $controller, _$q_){
        $q = _$q_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();

        $controller('EventListController', {
            $scope : scope
        });
    }));

    describe('Fetch All Events', function(){
       it('should return events from service', function(){

           var deferred = $q.defer();

           spyOn(EventsService, 'getAllEvents').and.returnValue(deferred.promise);

           scope.getAllEvents();

           deferred.resolve([{name:'Test Event'}]);

           $rootScope.$digest();

           expect(scope.events[0].name).toEqual('Test Event');
       });
    });
});