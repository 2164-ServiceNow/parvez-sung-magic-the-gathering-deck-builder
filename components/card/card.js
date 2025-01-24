angular
  .module("card", [])

  .component("card", {
    templateUrl: "components/card/card.html",
    controller: function (
      $scope,
      $http,
      searchBarService,
      deckService,
      favoriteService,
      deckService,
      cardModalService
    ) {
      // cards object to store card information
      $scope.cards = "";

      // cardDetails object to store card details
      $scope.cardDetails = "";

      // pageLink object to store pagination links
      $scope.pageLink = "";

      $scope.currentPage = "";

      // imgPlaceHolder object to store placeholder image
      $scope.imgPlaceHolder = "images/placeholderCard.jpg";

      // modalCard object to store card details for modal
      $scope.modalCard = [];

      // decks object to store deck information
      $scope.decks = [];

      //
      $scope.singlePage = false;
      $scope.totalCount = 0;

      $scope.$watch(
        function () {
          return searchBarService.getPageSize();
        },function(pageSize){
          $scope.pageSize = pageSize;
        });

      // selectedDeckIndex object to store selected deck index
      $scope.$watch(
        function () {
          // get search query
          return searchBarService.getQuery();
        },
        function (newQuery) {
          // call http.get with new query and save response to $scope.cards
          // set searchValue to newQuery
          $scope.searchValue = newQuery;

          // get cards from MTG API
          $http
            .get(`https://api.magicthegathering.io/v1/cards?${newQuery}`)
            .then((response) => {
              // store response data in $scope.cards
              $scope.cards = response.data;

              // parse pagination links
              $scope.parseLinkHeader(response.headers("Link"));

              $scope.totalCount = Number(response.headers("Total-Count"));

              $scope.singlePage = $scope.totalCount < $scope.pageSize;
              
            });
        }
      );

      // add card to favorites
      $scope.addtoFav = function (card) {
        $scope.favorties = favoriteService.addToFavorites(card);
      };

      // remove card from favorites
      $scope.details = function (cardDetails) {
        $scope.cardDetails = cardDetails;
        cardModalService.setCard(cardDetails);
      };

      // remove card from favorites
      $scope.$on("resetDetails", function () {
        $scope.cardDetails = "";
      });

      // parse pagination links
      $scope.parseLinkHeader = function (linkHeader) {
        if (!linkHeader) return {};

        // Split parts by comma
        const links = [];
        const parts = linkHeader.split(",");

        // Parse each part into a named link
        parts.forEach((part) => {
          let section = part.split(";");
          if (section.length < 2) return;

          // Remove angle brackets < >
          let link = section[0].replace(/<(.*)>/, "$1").trim();
          let name = section[1].replace(/rel="(.*)"/, "$1").trim();

          // Store links
          if (name === "first") $scope.firstPage = link;
          else if (name === "prev") $scope.previousPage = link;
          else if (name === "next") $scope.nextPage = link;
          else if (name === "last") $scope.lastPage = link;
        });

        // Return links
        return links;
      };

      // go to page
      $scope.goToPage = function (pageLink) {
        // return if no page link
        if (!pageLink) return;
        // get cards from MTG API
        $scope.firstPage = "";
        $scope.prevPage = "";
        $scope.nextPage = "";
        $scope.lastPage = "";

        // get cards from MTG API
        $http.get(pageLink).then((response) => {
          $scope.cards = response.data;
          $scope.parseLinkHeader(response.headers('Link')); // Parse pagination links					
					$scope.totalCount = Number(response.headers("Total-Count"));
	  			$scope.singlePage = $scope.totalCount < $scope.pageSize;
        });
      };

      // add card to deck
      $scope.cardDetails = function (card) {
        $scope.modalCard = card;
        cardModalService.setCard(card);
      };
      // add card to deck
      $scope.openAddToDeckModal = function (card) {
        $scope.modalCard = card;
        $scope.decks = deckService.getDecks();
      };
      // add card to deck
      $scope.addToDeck = function (modalCard, index) {
        deckService.addToDeck(modalCard, index);
      };

      // set deck index
      $scope.setDeckIndex = function (index) {
        $scope.deckIndex = index;
      };
    },
  });
