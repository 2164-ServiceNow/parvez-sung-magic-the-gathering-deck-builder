angular
  .module("card", [])

  .component("card", {
    templateUrl: "components/card/card.html",
    controller: function ($scope, $http, searchBarService) {
      $scope.cards = "";
      $scope.cardDetails = "";
      $scope.pageLink= "";
      $scope.currentPage = "";

      $scope.$watch(
        function () {
          return searchBarService.getQuery();
        },
        function (newQuery) {
          $scope.searchValue = newQuery;
          // console.log(`this is the query::: https://api.magicthegathering.io/v1/cards?${newQuery}`);

          $http
            .get(`https://api.magicthegathering.io/v1/cards?${newQuery}`)
            .then((response) => {
              $scope.cards = response.data;
              $scope.parseLinkHeader(response.headers('Link'));
            });
        }
      );

      $scope.details = function (cardDetails) {
        $scope.cardDetails = cardDetails;
        console.log(cardDetails);
      };

      $scope.$on("resetDetails", function () {
        $scope.cardDetails = "";
      });
      
      $scope.parseLinkHeader = function(linkHeader) {
        if (!linkHeader) return {};
      
        const links = [];
        const parts = linkHeader.split(',');
        
        parts.forEach(part => {
          let section = part.split(';');
          if (section.length < 2) return;
      
          // Remove angle brackets < >
          let link = section[0].replace(/<(.*)>/, '$1').trim();
          let name = section[1].replace(/rel="(.*)"/, '$1').trim();
          
          if(name === 'first') $scope.firstPage = link;
          else if(name === 'prev') $scope.previousPage = link;
          else if(name=== 'next') $scope.nextPage = link;
          else if(name === 'last') $scope.lastPage = link;
          
        });
        console.log(links);
        return links;
      }

      $scope.goToPage = function(pageLink){
        if(!pageLink) return;
        $scope.firstPage='';
        $scope.prevPage='';
        $scope.nextPage='';
        $scope.lastPage='';
        // console.log(`going to: ${pageLink}`);
        $http
            .get(pageLink)
            .then((response) => {
              $scope.cards = response.data;
              $scope.parseLinkHeader(response.headers('Link'));
            });
      }
      

      // $scope.next = function() {
      // 	$http.get(`${$scope.cards.next}`) 	// $http.post(‘<api-url>’,  <data here>) `…/?offset=$(80)&limit=${20}`
      // 	.then((response) => {
      // 		$scope.cards = response.data;
      // 		console.log($scope.cards)
      // 	})
      // }

      // $scope.previous = function() {
      // 	$http.get(`${$scope.cards.next}`) 	// $http.post(‘<api-url>’, <data here>)
      // 	.then((response) => {
      // 		$scope.cards = response.data;
      // 		console.log($scope.cards)
      // 	})
      // }
   
    // $scope.next = function() {
    //     searchBarService.setPageNumber(searchBarService.getPageNumber() + 1);
    //     const nextQuery = searchBarService.getQuery();
    //     $http
    //         .get(`https://api.magicthegathering.io/v1/cards?${nextQuery}`)
    //         .then((response) => {
    //           $scope.cards = response.data;
    //           console.log($scope.cards);
    //         });
      
    // };

    // $scope.previous = function() {
    //   searchBarService.setPageNumber(searchBarService.getPageNumber() - 1);
    //     const previousQuery = searchBarService.getQuery();
    //     $http
    //         .get(`https://api.magicthegathering.io/v1/cards?${previousQuery}`)
    //         .then((response) => {
    //           $scope.cards = response.data;
    //           console.log($scope.cards);
    //         });
    //       }
    },
  });
 