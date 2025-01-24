angular.module('set', [])

	.component('set', {
		templateUrl: 'components/set/set.html',
		controller: function ($scope, $http, searchBarService, $rootScope, deckService, favoriteService, cardModalService) {
			$scope.sets = "" // response from the http.get to the MTG API
			$scope.setDetails = '' // user selects a set to look, contains an object with all the selected set's details
			$scope.booster = '' // response from getting booster from set in MTG API
			$scope.cardDetails = "" // If user selects a card from opening a booster, contains an object of the card's details
			$scope.pageLink = "";
			$scope.currentPage = "";
			$scope.imgPlaceHolder = "images/placeholderCard.jpg";

			// If searchbar query changes, call http.get with new query and save response to $scope.sets
			$scope.$watch(function () {
				return searchBarService.getQuery();
			  }, function (newQuery) {
				$scope.searchValue = newQuery;
			  
				$http.get(`https://api.magicthegathering.io/v1/sets?name=${newQuery}`)
				  .then((response) => {
					$scope.sets = response.data;
					$scope.parseLinkHeader(response.headers('Link')); // Parse pagination links
				  }).catch((error) => {
					console.error('Error fetching sets:', error);
				  });
			  });
			  

			// User selects a set and html will show more details about the set
			$scope.details = function (setDetails) {
				$scope.setDetails = setDetails
			}

			// Pulls a booster out of a set using MTG API
			// MTG API is bugged; most sets return booster request with a 400 error status
			// https://api.magicthegathering.io/v1/sets/por/booster and https://api.magicthegathering.io/v1/sets/4ed/booster/ work
			$scope.pullBooster = function (setCode) {
				$http.get(`https://api.magicthegathering.io/v1/sets/${setCode}/booster`)
					.then((response) => {
						$scope.booster = response.data;
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
			$scope.resetDetails = function () {
				$scope.setDetails = ''
				$scope.booster = ''
				$scope.cardDetails = ''
			};

			// Clear detailed data and return to full set list when search is pressed 
			$scope.$on('resetDetails', function () {
				$scope.setDetails = ''
				$scope.booster = ''
				$scope.cardDetails = ''
			});

			// Function to get links from header response
			$scope.parseLinkHeader = function (linkHeader) {
				if (!linkHeader) return;
			  
				const parts = linkHeader.split(',');
				parts.forEach(part => {
				  let section = part.split(';');
				  if (section.length < 2) return;
			  
				  let link = section[0].replace(/<(.*)>/, '$1').trim();
				  let rel = section[1].replace(/rel="(.*)"/, '$1').trim();
			  
				  // Assign links to their corresponding variables
				  if (rel === 'first') $scope.firstPage = link;
				  if (rel === 'prev') $scope.previousPage = link;
				  if (rel === 'next') $scope.nextPage = link;
				  if (rel === 'last') $scope.lastPage = link;
				});
			  
				
			  };
			  
			  $scope.goToPage = function (pageLink) {
				if (!pageLink) return;
			 	
				$http.get(pageLink).then((response) => {
				  $scope.sets = response.data; // Update sets
				  $scope.parseLinkHeader(response.headers('Link')); // Parse new pagination links
				}).catch((error) => {
				  console.error('Error navigating to page:', error);
				});
			  };
			  

			$scope.imgPlaceHolder = "images/placeholderCard.jpg";
			$scope.modalCard = [];
			$scope.decks = [];

			$scope.cardDetails = function (card) {
				$scope.modalCard = card;
				cardModalService.setCard(card)
			};

			$scope.openAddToDeckModal = function (card) {
				$scope.modalCard = card;
				$scope.decks = deckService.getDecks();
			};

			$scope.addtoFav = function (card) {
				$scope.favorties = favoriteService.addToFavorites(card);
			};

			$scope.removeFromFavorites = function (index) {
				favoriteService.removeFromFavorites(index);
				$scope.favorites = favoriteService.getFavorites();
			};

			$scope.addToDeck = function (card, index) {
				if (!card || !index) {
					console.log("Error with card or index")
					return
				}
				deckService.addToDeck(card, index)
				$scope.decks = deckService.getDecks() || []
				$scope.broadcastDecksChange()
			}

			$scope.broadcastDecksChange = function () {
				$rootScope.$broadcast("decksChange");
			}
			// Add everything above
		}
	})