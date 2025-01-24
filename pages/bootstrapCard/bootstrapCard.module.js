angular
  .module("bootstrapCard", [])
  // filter to reformat how card text is displayed when it has '\n'
  .filter('newlineText', function($sce) {
    return function(text) {
      if (!text) return text
      const convertedText = text.replace(/\n/g, '<br>')
      return $sce.trustAsHtml(convertedText)
    }
  })
  .directive("bootstrapCard", function () {
    return {
      restrict: "E",
      scope: {
        card: "=", // the card being looked at by the directive
        onDetails: "&", // function for button to display card details
        onAddToDeck: "&", // function for button to add card to deck
        onFavorites: "&", // function for button to add card to favorites list
        removeFromFavorites: "&", // function for button to remove card from favorites list
        removeFromDeck: "&", // function for button to remove card from deck
        imgPlaceholder: "@", // image to use when card.imageUrl is unavailable
        cardDisplayType: "@", // string of the current page; indicates what buttons to show
        index: '@', // index of card in a deck's card array
      },
      templateUrl: 'pages/bootstrapCard/bootstrapCard.html',
      controller: function ($scope) {
        $scope.isInFavorites = function (card) {
          const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
          return favorites.some(fav => fav.id === card.id);
        }
      }
    }
  })
