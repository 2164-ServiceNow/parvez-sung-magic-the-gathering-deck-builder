angular.module('playtest', [])

.component('playtest', {
    templateUrl: 'components/playtest/playtest.html',
		controller: function ($scope, deckService) {
            $scope.decks = deckService.getDecks() || [] // array of decks available
            $scope.selectDeck = [] // user selects a deck to use
            $scope.selectDeckCards = [] // card array from selected deck
            $scope.hand = 7 // starting number of cards in hand in MTG

            // used when card.imageUrl is unavailable
            $scope.imgPlaceHolder = "images/placeholderCard.jpg";

            // Function to change the selected deck
            $scope.changeDeck = function(deck) {
                if (!deck) {
                    return
                }
                $scope.selectDeck = JSON.parse(deck)
                $scope.selectDeckCards = $scope.selectDeck.cards
                $scope.hand = 7
            }

            // Randomize cards in deck and draw new hand of 7 cards
            $scope.shuffle = function() {
                let currentIndex = $scope.selectDeckCards.length;
              
                while (currentIndex != 0) {
                  let randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
              
                  [$scope.selectDeckCards[currentIndex], $scope.selectDeckCards[randomIndex]] = [
                    $scope.selectDeckCards[randomIndex], $scope.selectDeckCards[currentIndex]];
                }

                $scope.hand = 7
              }

            // Draw a card from the selected deck
            $scope.drawCard = function(){
                $scope.hand += 1
            }
        }
})