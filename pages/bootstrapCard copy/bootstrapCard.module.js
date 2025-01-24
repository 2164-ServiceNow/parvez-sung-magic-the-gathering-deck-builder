angular.module("bootstrapCard", []).directive("bootstrapCard", function () {
  return {
    restrict: "E",
    scope: {
      card: "=",
      onDetails: "&",
      onAddToDeck: "&",
      onFavorites: "&",
      removeFromFavorites: "&",
      imgPlaceholder: "@",
      cardDisplayType: "@",
      index: "@",
    },
    templateUrl: "pages/bootStrapCard/bootstrapCard.module.html",
    controller: function ($scope, deckService) {
      $scope.cards = "";
      $scope.cardDetails = "";
      $scope.pageLink = "";
      $scope.currentPage = "";
      $scope.imgPlaceHolder = "images/placeholderCard.jpg";
      $scope.modalCard = [];
      $scope.decks = [];

      $scope.selectedDeckIndex = null;

      $scope.cardDetails = function (card) {
        $scope.modalCard = card;
        console.log(`modal card : ${$scope.modalCard}}`)
      };

      $scope.openAddToDeckModal = function (card) {
        $scope.decks = deckService.getDecks();
        console.log(`decks from card module: ${decks}`);
        $scope.selectedCard = $scope.card;
        // console.log($scope.selectedCard);
        if($scope.decks.length > 0){
          $scope.selectedDeckIndex = 0;
        }
      };


      $scope.addToDeck = function ( card, selectedDeckIndex ) {
        console.log(`Adding card ${card.name} to deck ${selectedDeckIndex}`);
        if (selectedDeckIndex !== null) {
          $scope.decks[selectedDeckIndex].cards.push(card);
          deckService.saveDecks();
        }
      };

      $scope.addToDeck = function (modalCard, index) {
        
        console.log(`before adding card :${deckService.getDecks()}`);
        deckService.addToDeck(modalCard, index);
        console.log(`after adding card :${deckService.getDecks()}`);
      };

      $scope.setDeckIndex = function (index) {
        $scope.deckIndex = index;
        console.log(`Deck index ${$scope.deckIndex}`);
      };

      $scope.handleAddToDeck = function () {
        if (
          $scope.selectedDeckIndex !== null &&
          $scope.selectedDeckIndex !== undefined
        ) {
          $scope.onAddToDeck({
            card: $scope.modalCard,
            selectedDeckIndex: $scope.selectedDeckIndex,
          });
        }
      };
    },
  };
});
