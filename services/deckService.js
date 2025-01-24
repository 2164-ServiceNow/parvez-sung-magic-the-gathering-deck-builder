angular
  .module("magicApp")
  .service("deckService", function ($rootScope, $window) {
    this.decks = [] // array of deck objects

    this.setDecks = function (decks) {
      this.decks = decks
    }

    // Create an empty 'New Deck' as default, insert arguments like name when given
    this.createDeck = function (
      cards = [],
      deckName = "New Deck",
      color = ["colorless"]
    ) {
      const newDeck = {
        name: deckName,
        color: color,
        cards: cards,
      }
      // Add to decks array and save decks in scope and localStorage
      this.decks = this.getDecks()
      this.decks.push(newDeck)
      $window.localStorage.setItem("decks", JSON.stringify(this.decks))
      this.decks = this.getDecks()
      this.broadcastDecksChange()
    }

    // pull decks from localStorage
    this.getDecks = function () {
      this.decks = JSON.parse($window.localStorage.getItem("decks")) || []
      return this.decks
    }

    // Adding a card object to the deck identified by deckIndex
    this.addToDeck = function (card, deckIndex) {
      this.decks = this.getDecks()
      this.decks[deckIndex].cards.push(card)
      this.decks[deckIndex].color = this.identifyDeckColor(deckIndex) // adjust deck.color based on new card addition
      $window.localStorage.setItem("decks", JSON.stringify(this.decks)) // save to localStorage
      this.decks = this.getDecks()
      this.broadcastDecksChange()
    }

    // Removing a card object from the deck identified by deckIndex
    this.removeFromDeck = function (cardIndex, deckIndex) {
      this.decks = this.getDecks()
      this.decks[deckIndex].cards.splice(cardIndex, 1);
      this.decks[deckIndex].color = this.identifyDeckColor(deckIndex) // adjust deck.color based on card subtraction
      $window.localStorage.setItem("decks", JSON.stringify(this.decks)) // save to localStorage
      this.decks = this.getDecks()
      this.broadcastDecksChange()
    }

    // Identifies the color property of the deck identified by deckIndex; if a card is a unique color, the color is added into the deck's color property
    this.identifyDeckColor = function (deckIndex) {
      let cards = this.decks[deckIndex].cards
      const colorSet = new Set()
      cards.forEach(card => {
        if (Array.isArray(card.colorIdentity)) {
          card.colorIdentity.forEach(color => colorSet.add(color))
        }
      })

      return colorSet.size > 0 ? Array.from(colorSet).sort() : ['colorless'];
    }

    // Inform components that decks in localStorage has changed
    this.broadcastDecksChange = function() {
      $rootScope.$broadcast("decksChange");
    }

    // Get graph information of the count of cards at certain converted mana costs (cmc)
    this.getCMCGraph = function(deckIndex) {
      let cards = this.decks[deckIndex].cards
      let cmcCount = {}
      cards.forEach(card => {
        if (typeof card.cmc === 'number') {
          cmcCount[card.cmc] = (cmcCount[card.cmc] || 0) + 1;
        }
      })
      return cmcCount
    }

    // Get graph information of the count of cards at certain rarities (Common, Uncommon, Rare, Mythic)
    this.getRarityGraph = function(deckIndex) {
      let cards = this.decks[deckIndex].cards
      let rarityCount = {}
      cards.forEach(card => {
        if (typeof card.rarity === 'string') {
          rarityCount[card.rarity] = (rarityCount[card.rarity] || 0) + 1;
        }
      })
      return rarityCount
    }

    // Get information of the number of land cards in deck (lands generate mana, a resource used to play other cards)
    this.getNumberOfLands = function(deckIndex) {
      let cards = this.decks[deckIndex].cards
      let landCount = 0
      cards.forEach(card => {
        if (Array.isArray(card.types) && card.types[0] === 'Land') {
          landCount += 1
        }
      })
      return landCount
    }

    // Call functions to return all deck statistics in an array
    this.getDeckStatistics = function(deckIndex) {
      this.decks = this.getDecks()
      let cmcGraph = this.getCMCGraph(deckIndex)
      let rarityGraph = this.getRarityGraph(deckIndex)
      let lands = this.getNumberOfLands(deckIndex)
      return [cmcGraph, rarityGraph, lands, this.decks[deckIndex].cards.length]
    }
  })
