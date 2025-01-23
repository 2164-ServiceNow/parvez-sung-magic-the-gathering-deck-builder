angular.module("favorites", []).component("favorites", {
  templateUrl: "components/favorites/favorites.html",
  controller: function ($scope, $window, favoriteService) {
    // const vm = this;
    $scope.imgPlaceHolder = "images/placeholderCard.jpg";

    $scope.removeFromFavorites = function (index) {
      favoriteService.removeFromFavorites(index);
      console.log(`index == ${index}`);  
      $scope.favorites = favoriteService.getFavorites();
        
        

    };

    $scope.addtoFav = function (card) {
      $scope.favorties = favoriteService.addToFavorites(card);
    };

    // If you need additional logic for initialization, add here
    this.$onInit = function () {
      // Load favorites from localStorage
      $scope.favorites =
        JSON.parse($window.localStorage.getItem("favorites")) || [];
      console.log("Favorites loaded:", $scope.favorites);
    };

    // const alertPlaceholder = document.getElementById("removeFavAlert");
    // const appendAlert = (message, type) => {
    //   const wrapper = document.createElement("div");
    //   wrapper.innerHTML = [
    //     `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    //     `   <div>${message}</div>`,
    //     '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    //     "</div>",
    //   ].join("");

    //   alertPlaceholder.append(wrapper);
    // };

    // const alertTrigger = document.getElementById("removeFavButton");
    // if (alertTrigger) {
    //   alertTrigger.addEventListener("click", () => {
    //     appendAlert("A card has been removed from Favorites", "success");
    //   });
    // }
  },
});
