angular.module("magicApp")
  .service("ModalService", function () {
    let card = null;

    return {
      getCard: function () {
        return card;
      },
      setCard: function (newCard) {
        card = newCard;
      },
    };
  });
