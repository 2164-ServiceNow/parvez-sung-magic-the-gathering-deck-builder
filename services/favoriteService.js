angular
.module('magicApp')
.service('favoriteService',function($rootScope, $window){
    this.favorites = [];

    this.setFavorites = function (favorites){
        this.favorites = favorites;
    }

    this.getFavorites = function(){
        this.favorites = JSON.parse($window.localStorage.getItem("favorites")) || [];
        return this.favorites;
    }

    this.addToFavorites = function(card){
      this.favorites = this.getFavorites();
      this.favorites.push(card);
      this.saveFavorites();
    //   console.log(this.favorites);
    }

    // Saves decks array to localStorage
    this.saveFavorites=function() {
        $window.localStorage.setItem(
          "favorites",
          JSON.stringify(this.favorites)
        );
        this.favorites = this.getFavorites();
    }

    this.removeFromFavorites = function(index){
        this.favorites = this.getFavorites();
        this.favorites.splice(index,1);
            this.saveFavorites();
            
            // console.log(favoriteService.getFavorites());
    }
});