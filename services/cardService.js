angular
  .module("magicApp", [])

  // Define the cardService to fetch cards from the API
  .service("cardService", function ($http) {
    this.getCards = function () {
      return $http
        .get("https://api.magicthegathering.io/v1/cards?page=1&pageSize=5") // API URL
        .then(function (response) {
          //   console.log(response.data);
          return response.data; // Assuming the response contains a 'cards' array
        })
        .catch(function (error) {
          console.error("Error fetching cards:", error);
          return []; // Return an empty array in case of an error
        });
    };
  });
