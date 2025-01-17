angular.module('keywordListPage', [])

.controller('keywordsCtrl', function(searchBarService){
    searchBarService.setQuery("");
})