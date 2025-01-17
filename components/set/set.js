angular.module('set', [])

.component('set', {
	templateUrl: 'components/set/set.html',
	controller: function($scope, $http, searchBarService){
		$scope.sets = "" // response from the http.get to the MTG API
        $scope.setDetails = '' // user selects a set to look, contains an object with all the selected set's details
		$scope.booster = '' // response from getting booster from set in MTG API
      	$scope.cardDetails = "" // If user selects a card from opening a booster, contains an object of the card's details
		$scope.pageLink= ""; 
		$scope.currentPage = "";

		// If searchbar query changes, call http.get with new query and save response to $scope.sets
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

		// User selects a set and html will show more details about the set
        $scope.details = function(setDetails) {
            $scope.setDetails = setDetails
            console.log(setDetails)
        }

		// Pulls a booster out of a set using MTG API
		// MTG API is bugged; most sets return booster request with a 400 error status
		// https://api.magicthegathering.io/v1/sets/por/booster and https://api.magicthegathering.io/v1/sets/4ed/booster/ work
		$scope.pullBooster = function(setCode) {
			$http.get(`https://api.magicthegathering.io/v1/sets/${setCode}/booster`)
			.then((response) => {
				$scope.booster = response.data;
				console.log(response.data)
			})
			.catch((error) => {
				$scope.booster = 'error';
				console.error('Error fetching booster:', error);
			});
        }

		// If user selects a card from successful booster open, we want to see the card's details
		$scope.showCardDetails = function (cardDetails) {
			$scope.cardDetails = cardDetails;
		  };

		// Clear detailed data and return to full set list when search is pressed 
        $scope.$on('resetDetails', function() {
            $scope.setDetails = ''
			$scope.booster = ''
			$scope.cardDetails = ''
        });

		// Function to get links from header response
		$scope.parseLinkHeader = function(linkHeader) {
			if (!linkHeader) return {};
		  
			const links = [];
			const parts = linkHeader.split(',');
			
			parts.forEach(part => {
			  let section = part.split(';');
			  if (section.length < 2) return;
		  
			  // Remove angle brackets < >
			  let link = section[0].replace(/<(.*)>/, '$1').trim();
			  let name = section[1].replace(/rel="(.*)"/, '$1').trim();
			  
			  if(name === 'first') $scope.firstPage = link;
			  else if(name === 'prev') $scope.previousPage = link;
			  else if(name=== 'next') $scope.nextPage = link;
			  else if(name === 'last') $scope.lastPage = link;
			  
			});
			console.log(links);
			return links;
		  }
	
		// Function to change pages of set list from MTG API
		$scope.goToPage = function(pageLink){
			if(!pageLink) return;
			$scope.firstPage='';
			$scope.prevPage='';
			$scope.nextPage='';
			$scope.lastPage='';
			console.log(`going to: ${pageLink}`);
			$http
				.get(pageLink)
				.then((response) => {
					$scope.cards = response.data;
					$scope.parseLinkHeader(response.headers('Link'));
				});
		}
	}
})