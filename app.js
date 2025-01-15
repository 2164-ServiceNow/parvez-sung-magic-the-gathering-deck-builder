'use strict';

angular.module("magicApp", ['ngRoute', 'cardListPage', 'setListPage', 'deckListPage', 'searchBar', 'card', 'set', 'deck'])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/main.html"
        })
        .when("/cards", {
            templateUrl: "pages/cardListPage/cardListPage.html",
            controller: "cardsCtrl"
        })
        .when("/sets", {
            templateUrl: "pages/setListPage/setListPage.html",
            controller: "setsCtrl"
        })
        .when("/decks", {
            templateUrl: "pages/deckListPage/deckListPage.html",
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});