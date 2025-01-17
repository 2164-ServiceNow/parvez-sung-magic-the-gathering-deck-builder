'use strict';

angular.module("magicApp", ['ngRoute', 'cardListPage', 'setListPage', 'deckListPage', 'keywordListPage',
    'searchBar', 'card', 'set', 'deck', 'keywords'])
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
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});