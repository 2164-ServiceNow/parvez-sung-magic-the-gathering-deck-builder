angular
  .module("card", [])
  .component("card", {
    templateUrl: "components/card/card.html",
    controller: function (
      $scope,
      $http,
      searchBarService      
    ) {
      $scope.cards = [];
      // $scope.cardDetails = "";
      // $scope.pageLink = "";
      // $scope.currentPage = "";
      $scope.imgPlaceHolder = "images/placeholderCard.jpg";

      $scope.init=function(){
        $scope.searchValue = searchBarService.getQuery();
        $http
          .get(`https://api.magicthegathering.io/v1/cards?${$scope.searchValue}`)
          .then((response) => {
            $scope.cards = response.data;
            console.log($scope.cards);
            $scope.parseLinkHeader(response.headers("Link"));
          });
      }
      $scope.init();
      $scope.selectedDeckIndex = null;

      $scope.$watch(
        function () {
          return searchBarService.getQuery();
        },
        function (newQuery) {
          $scope.searchValue = newQuery;

          $http
            .get(`https://api.magicthegathering.io/v1/cards?${newQuery}`)
            .then((response) => {
              $scope.cards = response.data;
              console.log($scope.cards);
              $scope.parseLinkHeader(response.headers("Link"));
            });
        }
      );

      // $scope.addtoFav = function (card) {
      //   $scope.favorties = favoriteService.addToFavorites(card);
      // };

      $scope.details = function (cardDetails) {
        $scope.cardDetails = cardDetails;
        console.log(cardDetails);
      };

      $scope.$on("resetDetails", function () {
        $scope.cardDetails = "";
      });

      $scope.parseLinkHeader = function (linkHeader) {
        if (!linkHeader) return {};

        const links = [];
        const parts = linkHeader.split(",");

        parts.forEach((part) => {
          let section = part.split(";");
          if (section.length < 2) return;

          // Remove angle brackets < >
          let link = section[0].replace(/<(.*)>/, "$1").trim();
          let name = section[1].replace(/rel="(.*)"/, "$1").trim();

          if (name === "first") $scope.firstPage = link;
          else if (name === "prev") $scope.previousPage = link;
          else if (name === "next") $scope.nextPage = link;
          else if (name === "last") $scope.lastPage = link;
        });
        console.log(links);
        return links;
      };

      $scope.goToPage = function (pageLink) {
        if (!pageLink) return;
        $scope.firstPage = "";
        $scope.prevPage = "";
        $scope.nextPage = "";
        $scope.lastPage = "";
        // console.log(`going to: ${pageLink}`);
        $http.get(pageLink).then((response) => {
          $scope.cards = response.data;
          $scope.parseLinkHeader(response.headers("Link"));
        });
      };

      // $scope.cardDetails = function (card) {
      //   $scope.modalCard = card;
      // };

      // $scope.openAddToDeckModal = function (card) {
      //   $scope.decks = deckService.getDecks();
      //   $scope.modalCard = card;
      //   if($scope.decks.length > 0){
      //     $scope.selectedDeckIndex = 0;
      //   }
      // };

      // $scope.addToDeck = function (modalCard, selectedDeckIndex) {
      //   console.log(`index::::${index}`);
      //   console.log(`before adding card :${deckService.getDecks()}`);
      //   deckService.addToDeck(modalCard, selectedDeckIndex);
      //   console.log(`after adding card :${deckService.getDecks()}`);
      // };

      // $scope.setDeckIndex = function (index) {
      //   $scope.deckIndex = index;
      //   console.log(`Deck index ${$scope.deckIndex}`);
      // };

      // const toastTrigger = document.getElementById("liveToastBtn");
      // const toastLiveExample = document.getElementById("liveToast");

      // if (toastTrigger) {
      //   const toastBootstrap =
      //     bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      //   toastTrigger.addEventListener("click", () => {
      //     toastBootstrap.show();
      //   });
      // }
    },
  });
