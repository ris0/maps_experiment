describe('googleMapService', function () {

    beforeEach(module('app'));

    var $httpBackend, googleMapService;
    beforeEach('Get tools', inject(function (_$httpBackend_, _googleMapService_) {
        $httpBackend = _$httpBackend_;
        googleMapService = _googleMapService_;
    }));

    it('should be an object', function () {
        expect(googleMapService).to.be.an('object');
    });

    describe('getZipCodes', function () {

        beforeEach(function () {

            $httpBackend
                .expectGET('/api/map/zip')
                .respond(responseData);

        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should make the expected request when called', function () {
            googleMapService.getZipCodes();
            $httpBackend.flush();
        });

        it('should return a promise that resolves to the data of the response', function (done) {
            googleMapService.getZipCodes().then(function (messages) {
                expect(messages).to.be.deep.equal(responseData);
                done();
            });
            $httpBackend.flush();
        });

    });
});