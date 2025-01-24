angular
  .module("cardModal", [])

  .component("cardModal", {
    templateUrl: "components/cardModal/cardModal.html",
    controller: function ($scope, $rootScope, deckService, cardModalService) {
        $scope.decks = deckService.getDecks() || [] // Deck list from localStorage
        $scope.imgPlaceHolder = "" // used when card.imageUrl is unavailable
        // Get card selected by user
        $scope.$watch(
            function () {
              return cardModalService.getCard()
            },
            function (newCard) {
              $scope.modalCard = newCard
            }
          )
      
        // Add card to deck and save to localStorage
        $scope.addToDeck = function (card, index) {
            if (!card || !index) {
                console.log("Error with card or index")
                return
            }
            deckService.addToDeck(card, index)
            $scope.decks = deckService.getDecks() || []
            $scope.broadcastDecksChange()
        }

        // Set selected deck
        $scope.setDeckIndex=function(index){
            if (!index) {
                return
            }
            $scope.deckIndex = index
        }

        // Alert components to deck list changing
        $scope.broadcastDecksChange = function() {
            $rootScope.$broadcast("decksChange")
        }
    }
})