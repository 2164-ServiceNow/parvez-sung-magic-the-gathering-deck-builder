angular.module('card', [])

.component('card', {
	templateUrl: 'app/components/card/card.html',
	controller: function($scope, $http, searchBarService){
		$scope.cards = ""

		$scope.$watch(function () {
			return searchBarService.getQuery()
		}, function(newQuery) {
			$scope.searchValue = newQuery

            $http.get(`https://api.magicthegathering.io/v1/cards?name=${newQuery}`)
			.then((response) => {
				$scope.cards = response.data;
				console.log($scope.cards)
			})
		})
		
		// $scope.next = function() {
		// 	$http.get(‘${$scope.pokemons.next}’) 	// $http.post(‘<api-url>’,  <data here>) `…/?offset=$(80)&limit=${20}`
		// 	.then((response) => {
		// 		$scope.pokemons = response.data;
		// 		console.log($scope.pokemons)
		// 	})
		// }

		// $scope.previous = function() {
		// 	$http.get(‘${$scope.pokemons.next}’) 	// $http.post(‘<api-url>’, <data here>)
		// 	.then((response) => {
		// 		$scope.pokemons = response.data;
		// 		console.log($scope.pokemons)
		// 	})
		// }

	}
})
