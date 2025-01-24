angular.module("favorites", ["bootstrapCard"]).component("favorites", {
  templateUrl: "components/favorites/favorites.html",
  //dependencies: cardModalService, deckService, favoriteService
  controller: function ($scope, $rootScope, $window, deckService, favoriteService, cardModalService) {
    
    // Add below for bootstrap-card, card-modal, and add-to-deck-modal.
    // Include $rootScope, deckService, favoriteService, cardModalService
    $scope.imgPlaceHolder = "images/placeholderCard.jpg"; // Placeholder image for cards which do not have an image

    // the card object that is passed to the modal
    $scope.modalCard = [];
    // the decks object that is passed to the modal
    $scope.decks = [];

    // show details for a card throug details modal
    $scope.cardDetails = function (card) {
      $scope.modalCard = card;
      cardModalService.setCard(card)
    };

    // open the add to deck modal
    $scope.openAddToDeckModal = function (card) {
      $scope.modalCard = card;
      $scope.decks = deckService.getDecks();
    };

    // add a card to the favorites
    $scope.addtoFav = function (card) {
      $scope.favorties = favoriteService.addToFavorites(card);
    };

    // remove a card from the favorites
    $scope.removeFromFavorites = function (index) {
      favoriteService.removeFromFavorites(index);
       
      $scope.favorites = favoriteService.getFavorites();
    };

    // add a card to a deck
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

    // broadcast that the decks have changed
    $scope.broadcastDecksChange = function() {
      $rootScope.$broadcast("decksChange");
    }
    

    // If you need additional logic for initialization, add here
    this.$onInit = function () {
      // Load favorites from localStorage
      $scope.favorites =
        JSON.parse($window.localStorage.getItem("favorites")) || [];
      
    };
  },
});
