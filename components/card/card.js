angular
  .module("card", [])

  .component("card", {
    templateUrl: "components/card/card.html",
    controller: function ($scope, $http, searchService) {
      $scope.cards = [];
      $scope.cardDetails = "";
      $scope.pageLink= "";
      $scope.count=0;
      $scope.totalCount=0;
      $scope.pageSize = 20;
      $scope.currentPage=1;
      $scope.totalPagenumbers = 0;
      $scope.pageNumber=1;
      $scope.pages = [];

      

      $scope.$watch(
        function () {
          return searchService.getQuery();
        },
        async function (newQuery) {
          if (newQuery) {
            try {
              $scope.cards = await searchService.getCards(newQuery); // Await the resolved data
                
              
            } catch (error) {
              console.error("Failed to fetch cards:", error);
            }
          }
        }
      );
      
      

      // $scope.$watch(
      //   function(){
      //     return searchService.getQuery();
      //   }, function (newQuery) {
      //     $http.get(`https://api.magicthegathering.io/v1/cards?${newQuery}`)
      //     .then((response) => {
      //       $scope.cards = response.data;
      //       $scope.getHeaders(response);
      //     });
      //   }
      // );
        

      // $scope.fetchCards = async function () {
      //   try {
      //     $scope.cards = await searchService.getCards();
      //     console.log("Cards fetched:", $scope.cards);
      //   } catch (error) {
      //     console.error("Failed to fetch cards:", error);
      //   }
      // };

      //  // Initialize component
      //  $scope.init = function () {
      //   console.log("Initializing card component");

      //   // Set default query in the service
      //   searchService.setQuery(`&page=${$scope.currentPage}&pageSize=${$scope.pageSize}`);

      //   // Fetch cards during initialization
      //   $scope.fetchCards();
      // };

      // Call the init function on controller load
      
     
      /*
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
              $scope.getHeaders(response);
              
            });
        }
      );*/

      $scope.getHeaders = function(response) {
        $scope.parseLinkHeader(response.headers('Link'));
        $scope.count(response.headers('Count'));
        $scope.totalCount(response.headers('Total-Count'));
        $scope.totalPagenumbers = ($scope.totalCount/$scope.pageSize)+1;
        searchService.setTotalPages($scope.totalPagenumbers);
          

      }

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

      $scope.gotToPageNumber = function(pageNumber) {
        $http
          .get(`https://api.magicthegathering.io/v1/cards?${$scope.searchValue}&page=${pageNumber}`)
          .then((response) => {
            $scope.cards = response.data;
            // $scope.getHeaders(response);
          });
      }

      $scope.getPage = function(pageNumber) {
        $scope.currentPage = pageNumber;
        searchService.setPageNumber(pageNumber);
        $scope.cards = searchService.getCards(searchService.getQuery());
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
              $scope.getHeaders(response);
            });
      }
    },
  });
 