angular
    .module("magicApp")
    .service("cardModalService", function () {
        this.card = []

        this.setCard = function(card) {
          if (card) { this.card = card }
        }

        this.getCard = function() {
          return this.card
        }
    })