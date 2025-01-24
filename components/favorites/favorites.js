angular.module("favorites", ["bootstrapCard"]).component("favorites", {
  templateUrl: "components/favorites/favorites.html",
  controller: function ($scope, $rootScope, $window, deckService, favoriteService, cardModalService) {
    // const vm = this;
    // Add below for bootstrap-card, card-modal, and add-to-deck-modal.
    // Include $rootScope, deckService, favoriteService, cardModalService
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
      console.log(`index == ${index}`);  
      $scope.favorites = favoriteService.getFavorites();
    };

    $scope.addToDeck = function (card, index) {
      if (!card || !index) {
          console.log("Error with card or index")
          return
      }
      deckService.addToDeck(card, index)
      $scope.decks = deckService.getDecks() || []
      console.log(`Modal Adding card to deck: ${deckService.getDecks()}`)
      $scope.broadcastDecksChange()
    }

    $scope.broadcastDecksChange = function() {
      $rootScope.$broadcast("decksChange");
    }
    // Add everything above

    // If you need additional logic for initialization, add here
    this.$onInit = function () {
      // Load favorites from localStorage
      $scope.favorites =
        JSON.parse($window.localStorage.getItem("favorites")) || [];
      console.log("Favorites loaded:", $scope.favorites);
    };
  },
});
