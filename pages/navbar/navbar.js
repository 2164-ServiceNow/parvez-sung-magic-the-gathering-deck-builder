angular.module('navbar',[])
.component('navbar',{
    templateUrl :"pages/navbar/navbar.html",
    controller: function($scope, searchBarService){

        $scope.searchOption="card";

        // this function will be triggered whenever a link is clicked in the navbar and switch the value to the different page
        $scope.switchSearch = function(searchOption){
            searchBarService.setSearchOption(searchOption);
            
        }
}
});