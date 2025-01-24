angular.module("favorites", ["bootstrapCard"]).component("favorites", {
  templateUrl: "components/favorites/favorites.html",
  controller: function ($scope, $rootScope, $window, deckService, favoriteService, cardModalService) {
    // Add below for bootstrap-card, card-modal, and add-to-deck-modal.
    // Include $rootScope, deckService, favoriteService, cardModalService
    $scope.imgPlaceHolder = "images/placeholderCard.jpg" // used when card.imageUrl is unavailable
    $scope.modalCard = [] // Card to display on modal
    $scope.decks = [] // List of decks

    // Display card details on modal
    $scope.cardDetails = function (card) {
      $scope.modalCard = card
      cardModalService.setCard(card)
    }

    // Display deck menu and adding card to deck modal
    $scope.openAddToDeckModal = function (card) {
      $scope.modalCard = card
      $scope.decks = deckService.getDecks()
    }

    // Add card to favorites list
    $scope.addtoFav = function (card) {
      $scope.favorties = favoriteService.addToFavorites(card)
    }

    // Remove card from favorites list
    $scope.removeFromFavorites = function (index) {
      favoriteService.removeFromFavorites(index)
      $scope.favorites = favoriteService.getFavorites()
    }

    // Add card to deck, update localStorage
    $scope.addToDeck = function (card, index) {
      if (!card || !index) {
          console.log("Error with card or index")
          return
      }
      deckService.addToDeck(card, index)
      $scope.decks = deckService.getDecks() || []
      $scope.broadcastDecksChange()
    }

    // Alert components to deck list changing
    $scope.broadcastDecksChange = function() {
      $rootScope.$broadcast("decksChange")
    }
    // Add everything above

    // If you need additional logic for initialization, add here
    this.$onInit = function () {
      // Load favorites from localStorage
      $scope.favorites =
        JSON.parse($window.localStorage.getItem("favorites")) || []
    }
  },
})
