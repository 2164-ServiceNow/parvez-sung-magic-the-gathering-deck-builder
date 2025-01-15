angular.module("cardsPaginated").component("cardsPaginated", {
  templateUrl: "components/cardsPaginated/cardsPaginated.html",
  controller: function ($scope, cardService) {
    $scope.cards = [];

    cardService
      .getCards()
      .then(function (cards) {
        $scope.cards = cards;
        console.log($scope.cards);
      })
      .catch(function (error) {
        console.error("Error fetching cards in component:", error);
        $scope.cards = [];
      });
  },
});
