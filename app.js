let app = angular.module("magicApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/pages/main.html"
        })
        .when("/cards", {
            templateUrl: "app/pages/cards.html"
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.directive("navbar", () => {
    return {
        restrict: 'E',
        templateUrl: "app/pages/navbar.html"
    };
});
