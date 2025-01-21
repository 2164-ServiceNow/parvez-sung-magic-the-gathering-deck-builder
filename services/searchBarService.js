angular.module('magicApp')
	.service('searchBarService', function($rootScope){
		this.query = '&page=0&pageSize=20';
		this.pageNumber = 0;
		this.pageSize = 20;
		this.totalPagenumbers = 0;

		this.setQuery = function(query){
			this.query = query
			// console.log(`${query} from setQuery in the Service!`);
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

		this.setTotalPageNumbers = function(totalPagenumbers){
			this.totalPagenumbers = totalPagenumbers
		}
		this.getTotalPagenumbers = function(){
			return this.totalPagenumbers
		}

		this.setCurrentPage = function(currentPage){
			this.currentPage = currentPage
		}
		this.getCurrentPage = function(){
			return this.currentPage
		}

        this.resetDetails = function() {
            $rootScope.$broadcast("resetDetails");
        };
	})
