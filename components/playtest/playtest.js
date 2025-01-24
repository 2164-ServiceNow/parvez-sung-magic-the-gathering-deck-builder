angular.module('playtest', [])

.component('playtest', {
    templateUrl: 'components/playtest/playtest.html',
		controller: function ($scope, deckService) {
            $scope.decks = deckService.getDecks() || []
            $scope.selectDeck = []
            $scope.selectDeckCards = []
            $scope.hand = 7

            $scope.init = function() {
                $scope.imgPlaceHolder = "images/placeholderCard.jpg"
            }

            $scope.changeDeck = function(deck) {
                if (!deck) {
                    return
                }
                $scope.selectDeck = JSON.parse(deck)
                $scope.selectDeckCards = $scope.selectDeck.cards
                console.log($scope.selectDeckCards)
            }

            $scope.shuffle = function(){
                for (let i = $scope.selectDeckCards.length - 1; i > 0; i--) {
                    const randomIndex = Math.floor(Math.random() * (i + 1));
                    [$scope.selectDeckCards[i], $scope.selectDeckCards[randomIndex]] = [$scope.selectDeckCards[randomIndex], $scope.selectDeckCards[i]];
                }
                $scope.hand = 7
                return $scope.selectDeckCards;
            }

            $scope.drawCard = function(){
                $scope.hand += 1
            }

            $scope.init()
        }
})