angular.module('deck', [])

.component('deck', {
	templateUrl: 'components/deck/deck.html',
	controller: function($scope, $window){
		$scope.decks = JSON.parse($window.localStorage.getItem('decks')) || []
        $scope.newDeckName = "New Deck"
        $scope.renameSelectDeckName = ""
        $scope.selectedDeck = ''
        $scope.selectedDeckIndex = null

        function saveDecks() {
            $window.localStorage.setItem('decks', JSON.stringify($scope.decks))
        }

        $scope.createDeck = function(name = "", color = "colorless", cards = []) {
            $scope.newDeckName = $scope.newDeckName.trim()
            name = name || $scope.newDeckName || "New Deck"
            color = color || "colorless"
            cards = cards || []

            const newDeck = {
                name: name,
                color: color,
                cards: cards
            }
            $scope.decks.push(newDeck)
            console.log($scope.decks)

            saveDecks()
        }

        $scope.selectDeck = function(index, deck) {
            $scope.selectedDeck = deck
            $scope.selectedDeckIndex = index
            console.log("Index: " + $scope.selectedDeckIndex)
        }

        $scope.clearSelectDeck = function() {
            $scope.selectedDeck = ''
            $scope.selectedDeckIndex = null
            $scope.renameSelectDeckName = ""
        }

        $scope.clearDecks = function() {
            $window.localStorage.removeItem('decks')
            $scope.decks = []
            $scope.clearSelectDeck()
            console.log("Decks in localStorage cleared")
        }

        $scope.deleteSelectDeck = function() {
            $scope.decks.splice($scope.selectedDeckIndex, 1)
            $scope.clearSelectDeck()
            saveDecks()
            console.log("Deck deleted", $scope.decks)
        }

        $scope.renameSelectDeck = function() {
            console.log("RENAME " + $scope.renameSelectDeckName)
            if ($scope.selectedDeck && $scope.renameSelectDeckName.trim() !== '') {
                $scope.selectedDeck.name = $scope.renameSelectDeckName.trim()
                $scope.decks[$scope.selectedDeckIndex] = $scope.selectedDeck
                saveDecks()
                console.log("RENAME", $scope.renameSelectDeckName)
            }
        }
	}
})