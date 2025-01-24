angular
  .module("addToDeckModal", [])
  .directive("addToDeckModal", function () {
    return {
      restrict: "E",
      scope: {
        modalCard: "=", // Two-way binding for the card data
        decks: "=", // Two-way binding for the list of decks
        onAddToDeck: "&", // Callback for adding the card to a deck
      },
      templateUrl: "pages/addToDeckModal/addToDeckModal.html",
      controller: function ($scope) {
        $scope.selectedDeckIndex = null; // Default value for the selected deck

        $scope.handleAddToDeck = function (index) {
          $scope.selectedDeckIndex = index
          console.log("handleAddToDeck " + $scope.selectedDeckIndex)
          console.log($scope.modalCard)
          if ($scope.selectedDeckIndex !== null) {
            $scope.onAddToDeck({
              card: $scope.modalCard,
              index: $scope.selectedDeckIndex,
            });
          }
        };
      },
    };
  });
