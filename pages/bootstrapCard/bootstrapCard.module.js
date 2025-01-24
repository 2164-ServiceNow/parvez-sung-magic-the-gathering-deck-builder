angular
.module("bootstrapCard", [])
.directive("bootstrapCard", function () {
  return {
    restrict: "E",
    scope: {
      card: "=",
      imgPlaceholder: "@",
      cardDisplayType: "@",
      // index: "@",
    },
    templateUrl: "pages/bootStrapCard/bootstrapCard.module.html",
    controller: function ($scope, favoriteService, ModalService) {
      // $scope.cards = "";  
      
      $scope.card= ModalService.getCard();
      
      // $scope.cardDetails = "";
      // $scope.pageLink = "";
      // $scope.currentPage = "";
      $scope.imgPlaceHolder = "images/placeholderCard.jpg";
      $scope.modalCard = [];
      

      // $scope.selectedDeckIndex = null;

      $scope.addToFavorites= function(card){
        favoriteService.addToFavorites(card);
      }

      $scope.removeFromFavorites= function(index){
        favoriteService.removeFromFavorites(index);
        $scope.favorites = favoriteService.getFavorites();
      }

      $scope.openAddToDeckModal = function () {
        console.log(`card ::::: ${$scope.card}`);
        ModalService.setCard($scope.card);

                
        if($scope.decks.length > 0){
          $scope.selectedDeckIndex = 0;
        }
      };

      // $scope.addToDeck = function ( card, selectedDeckIndex ) {
      //   console.log(`Adding card ${card.name} to deck ${selectedDeckIndex}`);
      //   if (selectedDeckIndex !== null) {
      //     $scope.decks[selectedDeckIndex].cards.push(card);
      //     deckService.saveDecks();
      //   }
      // };

      // $scope.addToDeck = function (modalCard, index) {
        
      //   console.log(`before adding card :${deckService.getDecks()}`);
      //   deckService.addToDeck(modalCard, index);
      //   console.log(`after adding card :${deckService.getDecks()}`);
      // };


      // $scope.removeFromDeck = function (card, deckIndex) {
        
      //   // console.log(`before adding card :${deckService.getDecks()}`);
      //   deckService.removeFromDeck(card, deckIndex);
      //   // console.log(`after adding card :${deckService.getDecks()}`);
      // };

      // $scope.setDeckIndex = function (index) {
      //   $scope.deckIndex = index;
      //   console.log(`Deck index ${$scope.deckIndex}`);
      // };

      // $scope.handleAddToDeck = function () {
      //   if (
      //     $scope.selectedDeckIndex !== null &&
      //     $scope.selectedDeckIndex !== undefined
      //   ) {
      //     $scope.onAddToDeck({
      //       card: $scope.modalCard,
      //       selectedDeckIndex: $scope.selectedDeckIndex,
      //     });
      //   }
      // };
    },
  };
});
