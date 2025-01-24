angular
    .module("magicApp")
    .service("cardModalService", function () {
        this.card = [] // card information the modal should use and display
        this.imgPlaceHolder=''

        this.setCard = function(card) {
          if (card) { this.card = card }
        }

        this.getCard = function () {
          return this.card;
        };
});
