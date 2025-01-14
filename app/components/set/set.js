angular.module('set', [])

.component('set', {
	templateUrl: 'app/components/set/set.html',
	controller: function($scope, $http, searchBarService){
		$scope.sets = ""

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
	}
})