angular
  .module("bootstrapCard", [])
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
        card: "=",
        onDetails: "&",
        onAddToDeck: "&",
        onFavorites: "&",
        removeFromFavorites: "&",
        removeFromDeck: "&",
        imgPlaceholder: "@",
        cardDisplayType: "@",
        index: '@',
      },
      templateUrl: 'pages/bootstrapCard/bootstrapCard.html',
    };
  });
