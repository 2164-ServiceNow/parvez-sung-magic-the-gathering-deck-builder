angular.module('cardListPage', [])

.controller('cardsCtrl', function(searchBarService){
    searchBarService.setQuery("");
})