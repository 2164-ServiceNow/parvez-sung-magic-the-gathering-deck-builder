angular
  .module("magicApp")
  .service("searchService", function ($rootScope, $http) {
    this.totalPages = 0;
    this.query = "&page=1&pageSize=20";
    this.cards = [];

    this.getTotalPages = function () {
        return this.totalPages;
        }

    this.setTotalPages = function (totalPages) {
        this.totalPages = totalPages;
        }

    this.getQuery = function () {
      return this.query;
    };

    this.setQuery = function (query) {
      this.query = query;
        console.log(`${this.query} 5 55 from setQuery in the Service!`);
    };

   

    this.getCards = function (query) {
        return $http.get(`https://api.magicthegathering.io/v1/cards?${query}`)
          .then((response) => {
            this.cards = response.data; // Store the cards (assuming response.data.cards is the array of cards)
            return this.cards; // Return the data for the caller
          })
          .catch((error) => {
            console.error("Error fetching cards:", error);
            throw error; // Re-throw the error for the caller to handle
          });
      };
      
      
      
  });
