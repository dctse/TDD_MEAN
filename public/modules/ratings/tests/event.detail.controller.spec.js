/**
 * Created by Danny Tse on 12/24/2014.
 */

'use strict';

describe('Event Detail Viewer', function(){
    var EventsService,
        $q,
        scope,
        deferred,
        $state,
        $rootScope;

    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(module(function($provide) {
        EventsService = {
            getSingleEvent: function(){}
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
        spyOn(EventsService, 'getSingleEvent').and.returnValue(deferred.promise);

        $controller('EventDetailController', {
            $scope : scope
        });

    }));

    describe('Fetch Single Event', function(){
        function sendDataToService(){
            deferred.resolve({id:1, name:'Test Event'});

            $rootScope.$digest();
        }

        it('should return an event from service', function(){

            scope.getEvent(1);

            sendDataToService();

            expect(scope.eventDetails.name).toEqual('Test Event');
        });

        it('should set loading to false after event data comes back', function(){

            scope.getEvent(2);

            scope.loading = true;

            sendDataToService();

            expect(scope.loading).toBeFalsy();
        });

        it('should set loading to false when service failed', function(){

            scope.getEvent(3);

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

    describe('Fetching Data', function(){
        it('should call getSingleEvent when controller is loaded', function(){
            scope.getEvent(1);
            expect(EventsService.getSingleEvent).toHaveBeenCalled();
        });
    });

//    describe('When selecting an item', function(){
//        it('should navigate to the detail state', function(){
//            scope.selectEvent(1);
//            expect($state.go).toHaveBeenCalledWith('eventDetails',
//                {eventId: 1});
//        });
//    });
});
