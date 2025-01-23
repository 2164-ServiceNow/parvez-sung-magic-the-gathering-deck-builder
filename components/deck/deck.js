angular.module('deck', [])
.filter('newlineText', function($sce) {
    return function(text) {
      if (!text) return text
      const convertedText = text.replace(/\n/g, '<br>')
      return $sce.trustAsHtml(convertedText)
    }
  })
.filter('colorIDs', function() {
    const colorMap = {
        "B": "Black",
        "G": "Green",
        "R": "Red",
        "U": "Blue",
        "W": "White",
        "colorless": "Colorless"
    }
    
    return function(colors) {
        if (Array.isArray(colors)) {
            return colors.map(color => colorMap[color] || color).join('-')
        }
        return ''
    }
})
.component('deck', {
	templateUrl: 'components/deck/deck.html',
	controller: function($scope, $rootScope, $window, deckService, cardModalService){
		$scope.decks = JSON.parse($window.localStorage.getItem('decks')) || [] // Grab deck object list from localStorage, else empty array
        $scope.newDeckName = "New Deck" // user text input for created deck's name
        $scope.renameSelectDeckName = "" // user text input for renaming deck's name
        $scope.selectedDeck = '' // object that holds the selected decks details
        $scope.selectedDeckIndex = null // where the selected deck is in the storage array'
        $scope.imgPlaceHolder = "images/placeholderCard.jpg"
        $scope.selectedDeckStatistics = []

        // Saves decks array to localStorage
        function saveDecks() {
            $window.localStorage.setItem('decks', JSON.stringify($scope.decks))
        }

        // Function to create a deck, default empty colorless New Deck
        $scope.createDeck = function(name = "", color = "colorless", cards = []) {
            $scope.newDeckName = $scope.newDeckName.trim()
            name = name || $scope.newDeckName || "New Deck"
            color = color || ["colorless"]
            cards = cards || []

            const newDeck = {
                name: name,
                color: color,
                cards: cards
            }
            $scope.decks.push(newDeck) 
            console.log($scope.decks)

            saveDecks() // push deck list to localStorage
            $scope.clearDeckScope()
        }

        // Function to select deck when deck is clicked on
        $scope.selectDeck = function(index, deck) {
            $scope.selectedDeck = deck
            $scope.selectedDeckIndex = index
            console.log("Index: " + $scope.selectedDeckIndex)
            $scope.getDeckStatistics(index)
        }

        // clear scope variable information, return to deck list
        $scope.clearDeckScope = function() {
            $scope.selectedDeck = ''
            $scope.selectedDeckIndex = null
            $scope.renameSelectDeckName = ""
        }

        // delete all decks from localStorage
        $scope.clearDecks = function() {
            $window.localStorage.removeItem('decks')
            $scope.decks = []
            $scope.clearDeckScope()
            console.log("Decks in localStorage cleared")
        }

        // delete selected deck from localStorage
        $scope.deleteSelectDeck = function() {
            $scope.decks.splice($scope.selectedDeckIndex, 1)
            $scope.clearDeckScope()
            saveDecks()
            console.log("Deck deleted", $scope.decks)
        }

        // rename selected deck in localStorage
        $scope.renameSelectDeck = function(name) {
            $scope.renameSelectDeckName = name
            console.log("RENAME " + $scope.renameSelectDeckName)
            if ($scope.selectedDeck && $scope.renameSelectDeckName.trim() !== '') {
                $scope.selectedDeck.name = $scope.renameSelectDeckName.trim()
                $scope.decks[$scope.selectedDeckIndex] = $scope.selectedDeck
                saveDecks()
                console.log("RENAME", $scope.renameSelectDeckName)
            }
        }

        // Download selected deck JSON
        $scope.downloadDeckJSON = function() {
            if (!$scope.selectedDeck) {
                return
            }
    
            const json = JSON.stringify($scope.selectedDeck, null, 2)
            const blob = new Blob([json], { type: "application/json" })

            const deckJSON = document.createElement("a")
            deckJSON.href = URL.createObjectURL(blob)
            deckJSON.download = `${$scope.selectedDeck.name}.json`
            document.body.appendChild(deckJSON)
            deckJSON.click()
            document.body.removeChild(deckJSON)
            console.log("Downloaded deck JSON")
        }

        // Upload deck JSON
        document.getElementById('uploadDeckJSON').addEventListener('change', function(event) {
            const deckFile = event.target.files[0] //get first file

            if (!deckFile) {
                return
            }

            // Read JSON file and create deck if valid
            const reader = new FileReader()
            reader.onload = function(e) {
                try {
                    const deck = JSON.parse(e.target.result)
                    if (deck.name && deck.color && deck.cards) {
                        $scope.createDeck(deck.name, deck.color, deck.cards)
                        $scope.clearDeckScope()
                        $scope.$apply()
                        console.log("Deck uploaded.")
                    } else {
                        console.error("Invalid deck file.")
                    }
                } catch (error) {
                    console.error("JSON Error:", error)
                }
            }

            // Clear file from reader
            event.target.value = ''

            reader.onerror = function(e) {
                console.error("Error reading file:", e)
            }

            reader.readAsText(deckFile)
        })

        // Sets card details to display on card modal
        $scope.setCardDetails = function(card) {
            console.log(card)
            cardModalService.setCard(card)
        }

        // Removes a card from the deck as indicated by its index in the deck list
        $scope.removeFromDeck = function(index) {
            console.log("Index " + index)
            console.log("Deck Index " + $scope.selectedDeckIndex)
            deckService.removeFromDeck(index, $scope.selectedDeckIndex)
        }

        // Recieves signal that deck(s) has updated and needs to be updated live on the decks page
        $rootScope.$on('decksChange', function() {
            $scope.decks = JSON.parse($window.localStorage.getItem('decks'))
            $scope.selectedDeck = $scope.decks[$scope.selectedDeckIndex]
            $scope.getDeckStatistics($scope.selectedDeckIndex)
        })

        // Gets deck statistics to display on deck details
        $scope.getDeckStatistics = function(index) {
            console.log("Calling getDeckStatistics")
            $scope.selectedDeckStatistics = deckService.getDeckStatistics(index)
            console.log($scope.selectedDeckStatistics)
        }

        // Orders the bars in the rarity graph by least rare to most rare
        $scope.rarityOrder = function(rarity) {
            const order = ["Common", "Uncommon", "Rare", "Mythic"]
            return order.indexOf(rarity) !== -1 ? order.indexOf(rarity) : order.length
        }
	}
})