'use strict';

angular.module("magicApp", ['ngRoute', 'cardListPage', 'setListPage', 'searchBar', 'card', 'set'])
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
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});