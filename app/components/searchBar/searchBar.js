angular.module('searchBar', [])

.component('searchbar',{
    templateUrl: 'app/components/searchBar/searchBar.html',
    controller: function SearchBarCtrl($scope){
        $scope.searchValue = ""
    }
})