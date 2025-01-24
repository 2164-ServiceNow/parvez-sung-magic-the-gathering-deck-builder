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
        $scope.selectedDeckIndex = null // Default value for the selected deck
        $scope.addToDeckCount = 0 // Tracks how many times the card has been added to deck

        $scope.handleAddToDeck = function (index) {
          $scope.selectedDeckIndex = index
          if ($scope.selectedDeckIndex !== null) {
            $scope.addToDeckCount++
            $scope.onAddToDeck({
              card: $scope.modalCard,
              index: $scope.selectedDeckIndex,
            })
          }
        }

        $scope.resetAddToDeckCount = function () {
          $scope.addToDeckCount = 0
        }

        // Reset addToDeckCount when modal closes
        const modal = document.getElementById('addToDeckModal')
        modal.addEventListener('hidden.bs.modal', event => {
          $scope.resetAddToDeckCount()
        })
      }
    }
  })
