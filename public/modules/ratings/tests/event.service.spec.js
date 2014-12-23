/**
 * Created by Danny Tse on 12/23/2014.
 */
'use strict';

describe('Events Service Test', function(){
    var $httpBackend,
      service,
      eventsUrl = 'http://localhost:3000/events';

    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(inject(function(_$httpBackend_, EventsService){
        $httpBackend = _$httpBackend_;
        service = EventsService;

    }));

    describe('When call getAllEvents', function(){
        it('should call API', function(){
            $httpBackend.expectGET(eventsUrl).respond(200);

            service.getAllEvents();

            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('Should send an error when API failed', function(){
            $httpBackend.whenGET(eventsUrl).respond(500);

            var err;

            service.getAllEvents().catch(function(e){
                err = e;
            });

            $httpBackend.flush();

            expect(err).toBeDefined();
        });

        it('Should handle data when request is passed', function(){
            $httpBackend.whenGET(eventsUrl)
                .respond(200, [{name: 'Test Event'}]);

            var data;

            service.getAllEvents().then(function(d){
                data = d;
            });

            $httpBackend.flush();

            expect(data[0].name).toEqual('Test Event');

        });
    });

    describe('Get Single event', function(){
        it('should return without outstanding expectation', function(){
            $httpBackend.expectGET(eventsUrl+'/1').respond(200);

            service.getSingleEvent(1);

            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('Should send an error when API failed', function(){
            $httpBackend.whenGET(eventsUrl+'/1').respond(500);

            var err;

            service.getSingleEvent(1).catch(function(e){
                err = e;
            });

            $httpBackend.flush();

            expect(err).toBeDefined();
        });
    });




});