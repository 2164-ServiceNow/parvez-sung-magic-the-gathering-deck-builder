angular
  .module("magicApp")
  .service("deckService", function ($rootScope, $window) {
    this.decks = []

    this.setDecks = function (decks) {
      this.decks = decks
    }

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
      this.decks = this.getDecks()
      this.decks.push(newDeck)
      $window.localStorage.setItem("decks", JSON.stringify(this.decks))
      this.decks = this.getDecks()
      this.broadcastDecksChange()
    }

    this.getDecks = function () {
      this.decks = JSON.parse($window.localStorage.getItem("decks")) || []
      return this.decks
    }

    this.addToDeck = function (card, deckIndex) {
      console.log(deckIndex)
      this.decks = this.getDecks()
      // console.log(card)
      console.log(this.decks)
      // console.log(this.decks[deckIndex])
      this.decks[deckIndex].cards.push(card)
      this.decks[deckIndex].color = this.identifyDeckColor(deckIndex)
      $window.localStorage.setItem("decks", JSON.stringify(this.decks))
      this.decks = this.getDecks()
      this.broadcastDecksChange()
    }

    this.removeFromDeck = function (cardIndex, deckIndex) {
      this.decks = this.getDecks()
      this.decks[deckIndex].cards.splice(cardIndex, 1);
      this.decks[deckIndex].color = this.identifyDeckColor(deckIndex)
      $window.localStorage.setItem("decks", JSON.stringify(this.decks))
      this.decks = this.getDecks()
      this.broadcastDecksChange()
    }

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

    this.broadcastDecksChange = function() {
      $rootScope.$broadcast("decksChange");
    }

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

    this.getDeckStatistics = function(deckIndex) {
      this.decks = this.getDecks()
      let cmcGraph = this.getCMCGraph(deckIndex)
      let rarityGraph = this.getRarityGraph(deckIndex)
      let lands = this.getNumberOfLands(deckIndex)
      return [cmcGraph, rarityGraph, lands, this.decks[deckIndex].cards.length]
    }
  })