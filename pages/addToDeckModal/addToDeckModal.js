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
      template: `
        <div
          class="modal fade"
          id="addToDeckModal"
          tabindex="-1"
          aria-labelledby="addLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <!-- Modal Header -->
              <div class="modal-header">
                <h5 class="modal-title" id="addLabel">
                  Add {{modalCard.name}} to Deck
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <!-- Modal Body -->
              <div class="modal-body">
                <div ng-if="decks && decks.length > 0">
                  <label for="deckList" class="form-label">Select your Deck</label>
                  <select
                    class="form-select"
                    aria-label="Select Deck"
                    id="deckList"
                    ng-model="selectedDeckIndex"
                    ng-options="index as deck.name for (index, deck) in decks track by index"
                  >
                    <option value="" disabled selected>Select a Deck</option>
                  </select>
                </div>
                <button
                  class="btn btn-primary mt-3"
                  ng-click="handleAddToDeck()"
                  ng-disabled="!selectedDeckIndex"
                >
                  Add to Deck
                </button>
              </div>

              <!-- Modal Footer -->
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      `,
      controller: function ($scope) {
        $scope.selectedDeckIndex = null; // Default value for the selected deck

        $scope.handleAddToDeck = function () {
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
