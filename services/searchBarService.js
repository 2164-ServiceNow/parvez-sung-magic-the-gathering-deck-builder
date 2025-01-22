angular.module('magicApp')
	.service('searchBarService', function($rootScope){
		this.query = "";
		this.pageNumber = 0;
		this.pageSize = 20;
		this.searchOption = "card";

		this.getSearchOption = function(){
			return this.searchOption;
		}

		this.setSearchOption = function(searchOption){
			this.searchOption = searchOption;
		}

		this.setQuery = function(query){
			this.query = query
			console.log(`${query} from setQuery in the Service!`);
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
            $rootScope.$broadcast("resetDetails");
        };

		
	})
