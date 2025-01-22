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
        if (Array.isArray(card.colors)) {
          card.colors.forEach(color => colorSet.add(color))
        }
      })

      return colorSet.size > 0 ? Array.from(colorSet).sort() : ['colorless'];
    }

    this.broadcastDecksChange = function() {
      $rootScope.$broadcast("decksChange");
    }
  })
