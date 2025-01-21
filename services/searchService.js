angular.module('magicApp')
.service('searchService', function($rootScope, $http){

    this.pageNumber = 1;
    this.query = "";
    this.pageSize = 20;
    this.pages =[];
    this.cards = [];
    this.pages = 0;
    this.totalPages = 0;

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

    this.setQuery = function(query){
        this.query = query
        console.log(`${query} from setQuery in the Service!`);
    }

    this.getQuery = function() {
        return this.query
    }

    this.getPages = function(){
        return this.pages
    }
    this.setPages = function(pages){
        this.pages = pages
    }

    this.setTotalPages = function(totalPages){
        this.totalPages = totalPages
    }
    this.getTotalPages = function(){
        return this.totalPages
    }

    this.getCards = function(query){
        $http.get(`https://api.magicthegathering.io/v1/cards?${query}`)
        .then((response) => {
            this.cards = response.data;
            this.setpages(response.headers('Count')/response.headers('Total-count') +1);
        });
    }
});