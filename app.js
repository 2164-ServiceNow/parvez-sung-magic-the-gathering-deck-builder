"use strict";

angular
  .module("magicApp", ["ngRoute", "cardsPaginated"])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "pages/main.html",
      })
      .when("/cards", {
        templateUrl: "components/cardsPaginated/cardsPaginated.html",
        // controller: "cardsPaginatedController",
      });

    // $locationProvider.hashPrefix("");

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true,
    });
  });
