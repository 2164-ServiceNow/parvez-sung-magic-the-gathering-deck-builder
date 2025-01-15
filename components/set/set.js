angular.module('set', [])

.component('set', {
	templateUrl: 'components/set/set.html',
	controller: function($scope, $http, searchBarService){
		$scope.sets = ""
        $scope.setDetails = ''

		$scope.$watch(function () {
			return searchBarService.getQuery()
		}, function(newQuery) {
			$scope.searchValue = newQuery

            $http.get(`https://api.magicthegathering.io/v1/sets?name=${newQuery}`)
			.then((response) => {
				$scope.sets = response.data;
				console.log($scope.sets)
			})
		})

        $scope.details = function(setDetails) {
            $scope.setDetails = setDetails
            console.log(setDetails)
        }

        $scope.$on('resetDetails', function() {
            $scope.setDetails = '';
        });
	}
})