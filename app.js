'use strict';

angular.module("magicApp", ['ngRoute', 'cardListPage', 'searchBar', 'card'])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/pages/main.html"
        })
        .when("/cards", {
            templateUrl: "app/pages/cardListPage/cardListPage.html",
            controller: "cardsCtrl"
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});