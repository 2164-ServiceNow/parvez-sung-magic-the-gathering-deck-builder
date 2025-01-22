angular
    .module("magicApp")
    .service("cardModalService", function () {
        this.card = []

        this.setCard = function(card) {
          console.log("Set service card")
          console.log(card)
          if (card) { this.card = card }
        }

        this.getCard = function() {
          console.log("Get card")
          console.log(this.card)
          return this.card
        }
    })