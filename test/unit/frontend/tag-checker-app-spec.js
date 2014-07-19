describe('tag checker app', function () {
    var scope,
        controller,
        httpBackend;
    beforeEach(function () {
        module('tagChecker');
    });

    describe('tagCheckerController', function () {
        beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            controller = $controller('tagCheckerController', {
                '$scope': scope
            });
        }));

        it('should reset result when no input text given', function () {
            scope.formData = {};
            scope.validateText();
            expect(scope.message).toBe('');
        });

        it('should set correct results on validateText', function () {
            var response = {
                isTaggedCorrectly: true,
                message: "Correctly tagged paragraph"
            };

            httpBackend.when("POST", "/api/validate").respond(response);

            scope.formData = {
                text: "<C>Hello, World!</C>"
            };
            scope.validateText();

            httpBackend.flush();
            expect(scope.isTaggedCorrectly).toBeTruthy();
            expect(scope.message).toEqual(response.message);
        });
    });

});
