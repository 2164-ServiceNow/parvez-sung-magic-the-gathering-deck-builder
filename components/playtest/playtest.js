angular.module('playtest', [])

.component('playtest', {
    templateUrl: 'components/playtest/playtest.html',
		controller: function ($scope, deckService) {
            $scope.decks = deckService.getDecks() || [] // array of decks available
            $scope.selectDeck = [] // user selects a deck to use
            $scope.selectDeckCards = [] // card array from selected deck
            $scope.hand = 7 // starting number of cards in hand in MTG

            $scope.init = function() {
                $scope.imgPlaceHolder = "images/placeholderCard.jpg" // used when card.imageUrl is unavailable
            }

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
            $scope.shuffle = function(){
                for (let i = $scope.selectDeckCards.length - 1; i > 0; i--) {
                    const randomIndex = Math.floor(Math.random() * (i + 1))
                    [$scope.selectDeckCards[i], $scope.selectDeckCards[randomIndex]] = [$scope.selectDeckCards[randomIndex], $scope.selectDeckCards[i]]
                }
                $scope.hand = 7
                return $scope.selectDeckCards
            }

            // Draw a card from the selected deck
            $scope.drawCard = function(){
                $scope.hand += 1
            }

            $scope.init()
        }
})