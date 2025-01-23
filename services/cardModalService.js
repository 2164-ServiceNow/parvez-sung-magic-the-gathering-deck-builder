angular
    .module("magicApp")
    .service("cardModalService", function () {
        this.card = []
        this.imgPlaceHolder=''

        this.setCard = function(card) {
          if (card) { this.card = card 
            // this.imgPlaceHolder = imgPlaceHolder;
          }
        }

        this.getCard = function() {
          return this.card
        }
    })