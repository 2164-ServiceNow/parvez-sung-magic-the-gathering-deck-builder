angular
  .module("bootstrapCard", [])
  .directive("bootstrapCard", function () {
    return {
      restrict: "E",
      scope: {
        card: "=",
        onDetails: "&",
        onAddToDeck: "&",
        onFavorites: "&",
        removeFromFavorites: "&",
        imgPlaceholder: "@",
        cardDisplayType: "@",
        index: '@',
      },
      template: `
        <div class="card m-2" style="width: 18rem">
          <img
            ng-src="{{card.imageUrl || imgPlaceholder}}"
            class="card-img-top"
            alt="Card image"
          />
          <div class="card-body">
            <h5 class="card-title">{{card.name}}</h5>
            <p class="card-text">{{card.text}}</p>
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#cardModal"
              data-toggle="tooltip" data-placement="top" title="See More Details"
              ng-click="onDetails({ card: card })"
            >
              &#8505;
            </button>
            <button ng-show="{{cardDisplayType !== 'decks' }}"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addToDeckModal"
              data-toggle="tooltip" data-placement="top" title="Add to a Deck"
              ng-click="onAddToDeck({ card: card })"
            >+</button>
            <button ng-show="{{cardDisplayType ==='decks'}}"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#cardModal1"
              data-toggle="tooltip" data-placement="top" title="remove from Deck"
              ng-click="onAddToDeck({ card: card })"
            >
              Add to Deck
            </button>
            <button ng-show="{{cardDisplayType !== 'favs' }}" class="btn btn-primary" ng-click="onFavorites({ card: card })">
              &hearts;
            </button>
            <button 
              id="removeFavButton"
              ng-show="{{cardDisplayType === 'favs'}}" 
              class="btn btn-primary" 
              ng-click="removeFromFavorites({ index: index  })"
              data-toggle="tooltip" data-placement="top" title="Remove from Favorites"
            >-</button>
          </div>
        </div>
      `,
    };
  });
