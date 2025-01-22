angular
  .module("magicApp")
  .service("deckService", function ($rootScope, $window) {
    this.decks = [];

    this.setDecks = function (decks) {
      this.decks = decks;
    };

    this.createDeck = function (
      cards = [],
      deckName = "New Deck",
      color = "colorless"
    ) {
      const newDeck = {
        name: deckName,
        color: color,
        cards: cards,
      };
      this.decks = this.getDecks();
      this.decks.push(newDeck);
      $window.localStorage.setItem("decks", JSON.stringify(this.decks));
    };

    this.getDecks = function () {
      this.decks = JSON.parse($window.localStorage.getItem("decks")) || [];
      return this.decks;
    };

    this.addToDeck = function (card, deckIndex) {
      console.log(deckIndex);
      this.decks = this.getDecks();
      // console.log(card);
      console.log(this.decks);
      // console.log(this.decks[deckIndex]);
      this.decks[deckIndex].cards.push(card);
      $window.localStorage.setItem("decks", JSON.stringify(this.decks));
    };
  });
