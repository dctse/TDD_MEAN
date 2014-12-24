/**
 * Created by Danny Tse on 12/23/2014.
 */

'use strict';

describe('Event List Viewer', function(){
    var EventsService,
      $q,
      scope,
      deferred,
      $state,
      $rootScope;

    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(module(function($provide) {
        EventsService = {
            getAllEvents: function(){}
        };

        $provide.value('EventsService', EventsService);
    }));

    beforeEach(inject(function(_$rootScope_, $controller, _$q_, $httpBackend, _$state_){
        $q = _$q_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();

        $httpBackend.whenGET('modules/core/views/home.client.view.html')
            .respond(200);

        $state = _$state_;
        spyOn($state, 'go');

        deferred = $q.defer();
        spyOn(EventsService, 'getAllEvents').and.returnValue(deferred.promise);

        $controller('EventListController', {
            $scope : scope
        });

    }));

    describe('Fetch All Events', function(){
        function sendDataToService(){
            deferred.resolve([{name:'Test Event'}]);

            $rootScope.$digest();
        }

        it('should return events from service', function(){

            scope.getAllEvents();

            sendDataToService();

            expect(scope.events[0].name).toEqual('Test Event');
        });

        it('should set loading to false after page data comes back', function(){

            scope.getAllEvents();

            scope.loading = true;

            sendDataToService();

            expect(scope.loading).toBeFalsy();
        });

        it('should set loading to false when service failed', function(){

            scope.getAllEvents();

            scope.loading = true;

            deferred.reject();

            $rootScope.$digest();

            expect(scope.loading).toBeFalsy();
        });
    });

    describe('Controller Scope', function(){
       it('set initializing loading to true', function(){
          expect(scope.loading).toBeTruthy();
       });
    });

    describe('Loading Controller', function(){
        it('should call getAllEvents when controller is loaded', function(){
            expect(EventsService.getAllEvents).toHaveBeenCalled();
        });
    });

    describe('When selecting an item', function(){
        it('should navigate to the detail state', function(){
            scope.selectEvent(1);
            expect($state.go).toHaveBeenCalledWith('eventDetails',
                {eventId: 1});
        });
    });

    describe('When calculating rating quality', function(){
        it('should return bad when avg rating < 2', function(){
            var quality = scope.calculateRatingQuality(1.9);
            expect(quality).toEqual('bad');
        });

        it('should return ok when between 2 and 3.5', function(){
            var quality = scope.calculateRatingQuality(3.5);
            expect(quality).toEqual('ok');
        });

        it('should return good when > 3.5', function(){
            var quality = scope.calculateRatingQuality(3.6);
            expect(quality).toEqual('good');
        });
    });
});