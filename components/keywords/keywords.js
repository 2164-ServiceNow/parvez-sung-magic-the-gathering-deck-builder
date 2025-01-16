angular.module('keywords', [])

.component('keywords', {
	templateUrl: 'components/keywords/keywords.html',
	controller: function($scope, searchBarService){
		$scope.selectKeyword = ""
        $scope.selectKeywordDetails = ''

		$scope.$watch(function () {
			return searchBarService.getQuery()
		}, function(newQuery) {
			$scope.searchValue = newQuery
            console.log("find keyword")
		})

        $scope.details = function(selectKeyword = "", selectKeywordDetails = "") {
            $scope.selectKeyword = selectKeyword
            $scope.selectKeywordDetails = selectKeywordDetails
            console.log(keywordsDetails)
        }

        $scope.$on('resetDetails', function() {
            $scope.selectKeyword = ""
            $scope.selectKeywordDetails = ''
        });
	}
})