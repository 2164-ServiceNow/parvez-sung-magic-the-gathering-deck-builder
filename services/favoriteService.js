angular
.module('magicApp')
.service('favoriteService',function($window){
    this.favorites = [] // array of cards to display on favorites

    this.setFavorites = function (favorites){
        this.favorites = favorites
    }

    // pull favorites out of localStorage
    this.getFavorites = function(){ 
        this.favorites = JSON.parse($window.localStorage.getItem("favorites")) || []
        return this.favorites
    }

    // push card object into favorites and localStorage
    this.addToFavorites = function(card){
      this.favorites = this.getFavorites()
      this.favorites.push(card)
      this.saveFavorites()
    }

    // Saves decks array to localStorage
    this.saveFavorites=function() {
        $window.localStorage.setItem(
          "favorites",
          JSON.stringify(this.favorites)
        )
        this.favorites = this.getFavorites()
    }

    // remove card object from favorites and localStorage
    this.removeFromFavorites = function(index){
        this.favorites = this.getFavorites()
        this.favorites.splice(index,1)
            this.saveFavorites()
    }
})