angular.module("searchBar", []).component("searchbar", {
  templateUrl: "components/searchBar/searchBar.html",
  controller: function SearchBarCtrl($scope, searchBarService) {
        
    $scope.searchValue = ""; // ng-model, default for search value
    $scope.pageNumber = 1; // default for page number
    $scope.pageSize = 20; // default for number of cards per page
    $scope.cmcValue = 1; // variable from cummulatie mana cost

    searchBarService.setQuery(`&page=${$scope.pageNumber}&pageSize=${$scope.pageSize}`);
    // Color selection goes here
    $scope.selectedColors = []; //selects colors in the search

    // NG-Model array for colors to be selected
    $scope.colors = [
      { label: "Select All", name:"selectAll", value: false },
      { label: "white", name:"W",value: false },
      { label: "blue", name:"U",value: false },
      { label: "black", name:"B",value: false },
      { label: "red", name:"R",value: false },
      { label: "green", name:"G",value: false },
    ];    

    // array to put selected rarities in
    $scope.selectedRarities = [];

    // level of card Rarities include Common, Uncommon, Rare, Mythic Rare, Special, Basic Land
    $scope.rarities = [
      { name: "selectAll", value: false },
      { name: "Common", value: false },
      { name: "Uncommon", value: false },
      { name: "Rare", value: false },
      { name: "Mythic Rare", value: false },
      { name: "Special", value: false },
      { name: "Basic Land", value: false },
    ];

    // array to put selected superTypes in
    $scope.selectedSuperTypes = [];

    // superTypes of cards include Basic, Legendary, Snow, World, Ongoing, Elite, Host, Saga
    $scope.superTypes = [
      { name: "selectAll", value: false },
      { name: "Basic", value: false },
      { name: "Legendary", value: false },
      { name: "Snow", value: false },
      { name: "World", value: false },
      { name: "Ongoing", value: false },
      { name: "Elite", value: false },
      { name: "Host", value: false },
      { name: "Saga", value: false },
    ];

    // array to put selected types in
    $scope.selectedTypes = [];

    // types of cards include Creature, Enchantment, Instant, Sorcery, Artifact, Planeswalker, Land
    $scope.types = [
      { name: "selectAll", value: false },
      { name: "Creature", value: false },
      { name: "Enchantment", value: false },
      { name: "Instant", value: false },
      { name: "Sorcery", value: false },
      { name: "Artifact", value: false },
      { name: "Planeswalker", value: false },
      { name: "Land", value: false },
    ];

    // array to put selected subTypes in
    $scope.selectedSubTypes = [];
 
    // unique subTypes of cards
    $scope.subTypes = [
      { name: "selectAll", value: false },
      { name: "Human", value: false },
      { name: "Elf", value: false },
      { name: "Goblin", value: false },
      { name: "Bird", value: false },
      { name: "Cat", value: false },
      { name: "Dragon", value: false },
      { name: "Angel", value: false },
      { name: "Zombie", value: false },
      { name: "Trap", value: false },
      { name: "Arcane", value: false },
      { name: "Equipment", value: false },
      { name: "Aura", value: false },
      { name: "Rat", value: false },
      { name: "Squirrel", value: false },
    ];

    // function to join result of checbox arrays into a string
    $scope.joinArrayMembers = function (array, key = "value",nameKey = "name") {
      return array
        .filter((item)=>item.name !== "selectAll") // Filter out selectAll
        .filter((item) => item[key]) // Filter where key is true
        .map((item) => item[nameKey]) // Extract names using nameKey
        .join(","); // Join with commas
    };
    
    // function to toggle checkboxes
    $scope.toggle = function(array, name, value){
      console.log(array);
      if(name ==="selectAll" && value === true){
            array.forEach((item) => {
            item.value = true;
          });
      } else if(name ==="selectAll" && value === false) {
          array.forEach((item) => {
          item.value = false;
        });
      } else if(name !== "selectAll" && value === false){
        array[0].value = false;
      } else {
        array.filter((item) => item.name !== "selectAll").every((item) => item.value === true) ? array[0].value = true : array[0].value = false;
      }
    }    

    // The Search Function
    $scope.search = function () {
      // creating strings from selected checkboxes
      $scope.selectedColorsQuery = $scope.joinArrayMembers($scope.colors);
      $scope.selectedRaritiesQuery = $scope.joinArrayMembers($scope.rarities);
      $scope.selectedTypesQuery = $scope.joinArrayMembers($scope.types);
      $scope.selectedSuperTypesQuery = $scope.joinArrayMembers($scope.superTypes);
      $scope.selectedSubTypesQuery = $scope.joinArrayMembers($scope.subTypes);

      const queryParts = [
        $scope.searchValue.length > 0 ? `&name=${$scope.searchValue}` : "",
        $scope.selectedColorsQuery.length > 0 ? `&colors=${$scope.selectedColorsQuery}` : "",
        $scope.selectedRaritiesQuery.length > 0 ? `&rarity=${$scope.selectedRaritiesQuery}` : "",
        $scope.selectedTypesQuery.length > 0 ? `&type=${$scope.selectedTypesQuery}` : "",
        $scope.selectedSuperTypesQuery.length > 0 ? `&supertypes=${$scope.selectedSuperTypesQuery}` : "",
        $scope.selectedSubTypesQuery.length > 0 ? `&subtypes=${$scope.selectedSubTypesQuery}` : "",
        `&page=${$scope.pageNumber}&pageSize=${$scope.pageSize}`
      ];
      
      // Join into one line and trim
      const finalQuery = queryParts.join("").trim();
      
      searchBarService.setQuery(finalQuery);
      
      // searchBarService.resetDetails();
    };
  },
});
