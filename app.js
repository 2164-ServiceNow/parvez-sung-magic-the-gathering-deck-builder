'use strict';

angular.module("magicApp", ['ngRoute', 'cards', 'searchBar'])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/pages/main.html"
        })
        .when("/cards", {
            templateUrl: "app/pages/cardsPage/cards.html",
            controller: "cardsCtrl"
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});