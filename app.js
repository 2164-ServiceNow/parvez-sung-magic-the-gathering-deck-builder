'use strict'

angular.module("magicApp", ['ngRoute', 'cardListPage', 'setListPage', 'deckListPage', 'keywordListPage', 'favoritePage', 'playtestPage','searchBar', 'card', 'set', 'deck', 'keywords','navbar', 'cardModal','favorites', 'playtest', 'bootstrapCard', 'addToDeckModal'])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/cardListPage/cardListPage.html",
            controller: "cardsCtrl"
        })
        .when("/cards", { // User Story 1
            templateUrl: "pages/cardListPage/cardListPage.html",
            controller: "cardsCtrl"
        })
        .when("/favorites", { // User Story 6
            templateUrl: "pages/favoritesPage/favoritesPage.html",
        })
        .when("/sets", { // User Story 2
            templateUrl: "pages/setListPage/setListPage.html",
            controller: "setsCtrl"
        })
        .when("/decks", { // User Stories 4, 5, 7
            templateUrl: "pages/deckListPage/deckListPage.html",
        })
        .when("/keywords", { // User Story 3
            templateUrl: "pages/keywordListPage/keywordListPage.html",
            controller: "keywordsCtrl"
        })
        .when("/playtest", { // User Story 8
            templateUrl: "pages/playtestPage/playtestPage.html",
        })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    })
})