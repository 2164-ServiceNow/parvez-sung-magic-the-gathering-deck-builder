angular.module('setListPage', [])

.controller('setsCtrl', function(searchBarService){
    searchBarService.setQuery("");
})