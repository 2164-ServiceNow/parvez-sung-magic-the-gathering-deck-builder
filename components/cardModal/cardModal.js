angular
  .module("cardModal", [])

  .component("cardModal", {
    templateUrl: "components/cardModal/cardModal.html",
    controller: function ($scope, $rootScope, deckService, cardModalService) {
        $scope.decks = deckService.getDecks() || []
        $scope.imgPlaceHolder = "images/placeholderCard.jpg";
        $scope.$watch(
            function () {
              return cardModalService.getCard();
            },
            function (newCard) {
              $scope.modalCard = newCard;
            }
          );

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

        $scope.setDeckIndex=function(index){
            if (!index) {
                return
            }
            $scope.deckIndex = index
        }

        $scope.broadcastDecksChange = function() {
            $rootScope.$broadcast("decksChange");
        }
    }
})