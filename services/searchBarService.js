angular.module('magicApp')
	.service('searchBarService', function($rootScope){
		this.query = "" // string query from input
		this.pageNumber = 0 // current page
		this.pageSize = 20 // number of units
		this.searchOption = "card" // identify object to look for

		this.getSearchOption = function(){
			return this.searchOption
		}

		this.setSearchOption = function(searchOption){
			this.searchOption = searchOption
		}

		this.setQuery = function(query){
			this.query = query
		}

		this.getQuery = function() {
			return this.query
		}

		this.setPageNumber = function(pageNumber){
			this.pageNumber = pageNumber
		}
		this.getPageNumber = function(){
			return this.pageNumber
		}

		this.setPageSize = function(pageSize){
			this.pageSize = pageSize
		}
		this.getPageSize = function(){
			return this.pageSize
		}

        this.resetDetails = function() {
            $rootScope.$broadcast("resetDetails")
        }

		
	})
