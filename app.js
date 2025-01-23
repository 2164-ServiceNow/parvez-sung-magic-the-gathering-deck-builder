'use strict';

angular.module("magicApp", ['ngRoute', 'cardListPage', 'setListPage', 'deckListPage', 'keywordListPage', 'favoritePage','searchBar', 'card', 'set', 'deck', 'keywords','navbar', 'cardModal','favorites', 'bootstrapCard', 'addToDeckModal'])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/cardListPage/cardListPage.html",
            controller: "cardsCtrl"
        })
        .when("/cards", {
            templateUrl: "pages/cardListPage/cardListPage.html",
            controller: "cardsCtrl"
        })
        .when("/favorites", {
            templateUrl: "pages/favoritesPage/favoritesPage.html",
            // controller: 'favoriteCtrl'
            
        })
        .when("/sets", {
            templateUrl: "pages/setListPage/setListPage.html",
            controller: "setsCtrl"
        })
        .when("/decks", {
            templateUrl: "pages/deckListPage/deckListPage.html",
            controller: 'decksCtrl'
        })
        .when("/keywords", {
            templateUrl: "pages/keywordListPage/keywordListPage.html",
            controller: "keywordsCtrl"
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});