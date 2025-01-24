angular.module('navbar',[])
.controller('navbar',{
    templateUrl :"pages/navbar/navbar.html",
    controller: function($scope, searchBarService){

        // $scope.searchOption="card";

        // this function will be triggered whenever a link is clicked in the navbar and switch the value to the different page
        $scope.switchSearch = function(searchOption, event){
            if(event){
                searchBarService.setSearchOption(searchOption);
            }
            
        }
}
});