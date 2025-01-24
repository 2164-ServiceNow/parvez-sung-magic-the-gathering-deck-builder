'use strict';

angular.module("magicApp", ['ngRoute', 'cardListPage', 'setListPage', 'deckListPage', 'keywordListPage', 'favoritePage', 'playtestPage','searchBar', 'card', 'set', 'deck', 'keywords','navbar', 'cardModal','favorites', 'playtest', 'bootstrapCard', 'addToDeckModal'])
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
        })
        .when("/sets", {
            templateUrl: "pages/setListPage/setListPage.html",
            controller: "setsCtrl"
        })
        .when("/decks", {
            templateUrl: "pages/deckListPage/deckListPage.html",
        })
        .when("/keywords", {
            templateUrl: "pages/keywordListPage/keywordListPage.html",
            controller: "keywordsCtrl"
        })
        .when("/playtest", {
            templateUrl: "pages/playtestPage/playtestPage.html",
        })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});