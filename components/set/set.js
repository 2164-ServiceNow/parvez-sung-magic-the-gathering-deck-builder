angular.module('set', [])

.component('set', {
	templateUrl: 'components/set/set.html',
	controller: function($scope, $http, searchBarService){
		$scope.sets = ""
        $scope.setDetails = ''
		$scope.booster = ''

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
		// https://api.magicthegathering.io/v1/sets/por/booster and https://api.magicthegathering.io/v1/sets/4ed/booster/ works
		$scope.pullBooster = function(setCode) {
			$http.get(`https://api.magicthegathering.io/v1/sets/${setCode}/booster`)
			.then((response) => {
				$scope.booster = response.data;
				console.log(response.data)
			})
        }

        $scope.$on('resetDetails', function() {
            $scope.setDetails = '';
			$scope.booster = '';
        });
	}
})