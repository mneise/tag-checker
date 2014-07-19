var tagChecker = angular.module('tagChecker', []);

tagChecker.controller('tagCheckerController', ['$scope', '$http', 
                                               function($scope, $http) {

	$scope.formData = {};
    $scope.message = '';

	$scope.validateText = function() {
        if ($scope.formData.text &&
            $scope.formData.text.length > 0) {
		    $http.post('/api/validate', $scope.formData)
			    .success(function(data) {
				    $scope.message = data.message;
                    $scope.isTaggedCorrectly = data.isTaggedCorrectly;
			    })
			    .error(function(data) {
				    console.log('Error: ' + data);
			    });
        } else {
            $scope.message = '';
        }
	};
}]);
