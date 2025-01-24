angular.module("searchBar", []).component("searchbar", {
  templateUrl: "components/searchBar/searchBar.html",
  controller: function SearchBarCtrl($scope, searchBarService) { // search bar Service is injected
    $scope.searchoption = "card" || ''; // default for search option

    // Watch for changes in search option and modify the search bar accordingly
    $scope.$watch(
      function () {
        return searchBarService.getSearchOption(); // get the current search option
      }, function (searchOption) {
        $scope.searchoption = searchOption; // set the search option to the current search option
      }
    )

    $scope.searchValue = ""; // ng-model, default for search value
    $scope.pageNumber = 1; // default for page number
    $scope.pageSize = 20; // default for number of cards per page
    $scope.cmcValue = 1; // variable from cummulatie mana cost

    // set the query to the default values valid for all searches and pagination 
    searchBarService.setQuery(
      `&page=${$scope.pageNumber}&pageSize=${$scope.pageSize}`
    );
    // Color selection goes here
    $scope.selectedColors = []; //selects colors in the search

    // NG-Model array for colors to be selected
    $scope.colors = [
      { label: "Select All", name: "selectAll", value: false },
      { label: "White", name: "W", value: false },
      { label: "Blue", name: "U", value: false },
      { label: "Black", name: "B", value: false },
      { label: "Red", name: "R", value: false },
      { label: "Green", name: "G", value: false },
    ];

    // array to put selected rarities in
    $scope.selectedRarities = [];

    // level of card Rarities include Common, Uncommon, Rare, Mythic Rare, Special, Basic Land
    $scope.rarities = [
      { label: "Select All", name: "selectAll", value: false },
      { label: "Common", name: "common", value: false },
      { label: "Uncommon", name: "uncommon", value: false },
      { label: "Rare", name: "rare", value: false },
      { label: "Mythic Rare", name: "mythicRare", value: false },
      { label: "Special", name: "special", value: false },
      { label: "Basic Land", name: "basicLand", value: false },
    ];

    // array to put selected superTypes in
    $scope.selectedSuperTypes = [];

    // superTypes of cards include Basic, Legendary, Snow, World, Ongoing, Elite, Host, Saga
    $scope.superTypes = [
      { label: "Select All", name: "selectAll", value: false },
      { label: "Basic", name: "Basic", value: false },
      { label: "Legendary", name: "Legendary", value: false },
      { label: "Snow", name: "Snow", value: false },
      { label: "World", name: "World", value: false },
      { label: "Ongoing", name: "Ongoing", value: false },
      { label: "Elite", name: "Elite", value: false },
      { label: "Host", name: "Host", value: false },
      { label: "Saga", name: "Saga", value: false },
    ];

    // array to put selected types in
    $scope.selectedTypes = [];

    // types of cards include Creature, Enchantment, Instant, Sorcery, Artifact, Planeswalker, Land
    $scope.types = [
      { label: "Select All", name: "selectAll", value: false },
      { label: "Creature", name: "Creature", value: false },
      { label: "Enchantment", name: "Enchantment", value: false },
      { label: "Instant", name: "Instant", value: false },
      { label: "Sorcery", name: "Sorcery", value: false },
      { label: "Artifact", name: "Artifact", value: false },
      { label: "Planeswalker", name: "Planeswalker", value: false },
      { label: "Land", name: "Land", value: false },
    ];

    // array to put selected subTypes in
    $scope.selectedSubTypes = [];

    // unique subTypes of cards
    $scope.subTypes = [
      { label: "Select All", name: "selectAll", value: false },
      { label: "Human", name: "Human", value: false },
      { label: "Elf", name: "Elf", value: false },
      { label: "Goblin", name: "Goblin", value: false },
      { label: "Bird", name: "Bird", value: false },
      { label: "Cat", name: "Cat", value: false },
      { label: "Dragon", name: "Dragon", value: false },
      { label: "Angel", name: "Angel", value: false },
      { label: "Zombie", name: "Zombie", value: false },
      { label: "Trap", name: "Trap", value: false },
      { label: "Arcane", name: "Arcane", value: false },
      { label: "Equipment", name: "Equipment", value: false },
      { label: "Aura", name: "Aura", value: false },
      { label: "Rat", name: "Rat", value: false },
      { label: "Squirrel", name: "Squirrel", value: false },
    ];

    // function to toggle the search bar
    const searchInput = document.getElementById("searchValue");
    const filterCollapse = document.getElementById(
      "panelsStayOpen-collapseOne"
    );
    // using accordian button to hid the search filter for the cards
    const accordianButton = document.getElementById("accordianButton");
    // using search bar container to check if the search bar is active
    const searchBarContainer = document.getElementById("searchBarContainer");

    // filterCollapse.style.transition = "height 1s ease";
    document.addEventListener("click", function (event) {
      if (!searchBarContainer.contains(event.target) && $scope.searchoption === 'card') {
      if (filterActive) {
        accordianButton.click(); // close the search filter
        filterActive = false;
      }
      }
    });

    filterActive = false; //default value for filterActive
    
    searchInput.addEventListener("focus", function (event) {
      if ($scope.searchoption === 'card') {
      
      if (!filterActive) {
        accordianButton.click();
        filterActive = true;
      }
      }
    });

    // function to join result of checbox arrays into a string
    $scope.joinArrayMembers = function (
      array,
      key = "value",
      nameKey = "name"
    ) {
      return array
        .filter((item) => item.name !== "selectAll") // Filter out selectAll
        .filter((item) => item[key]) // Filter where key is true
        .map((item) => item[nameKey]) // Extract names using nameKey
        .join(","); // Join with commas
    };

    // function to toggle checkboxes
    $scope.toggle = function (array, name, value) {
      // If selectAll is checked, check all other checkboxes
      if (name === "selectAll" && value === true) {
        array.forEach((item) => {
          item.value = true;
        });
      // If selectAll is unchecked, uncheck all other checkboxes
      } else if (name === "selectAll" && value === false) {
        array.forEach((item) => {
          item.value = false;
        });
      // If any other checkbox is unchecked, uncheck selectAll
      } else if (name !== "selectAll" && value === false) {
        array[0].value = false;
      } else {
        // If all other checkboxes are checked, check selectAll
        array
          .filter((item) => item.name !== "selectAll")
          .every((item) => item.value === true)
          ? (array[0].value = true)
          : (array[0].value = false);
      }
    };

    // The Search Function
    $scope.search = function () {
      // creating strings from selected checkboxes

      // Join selected colors into a string
      $scope.selectedColorsQuery = $scope.joinArrayMembers($scope.colors);
      // Join selected rarities into a string
      $scope.selectedRaritiesQuery = $scope.joinArrayMembers($scope.rarities);
      // Join selected types into a string
      $scope.selectedTypesQuery = $scope.joinArrayMembers($scope.types);
      // Join selected superTypes into a string
      $scope.selectedSuperTypesQuery = $scope.joinArrayMembers(
        $scope.superTypes // superTypes of cards include Basic, Legendary, Snow, World, Ongoing, Elite, Host, Saga
      );
      // Join selected subTypes into a string
      $scope.selectedSubTypesQuery = $scope.joinArrayMembers($scope.subTypes);

      // Create an array of query parts
      const queryParts = [
        // Add search value if it exists
        $scope.searchValue.length > 0 ? `&name=${$scope.searchValue}` : "",
        // Add selected colors if they exist
        $scope.selectedColorsQuery.length > 0? `&colors=${$scope.selectedColorsQuery}`: "",
        // Add selected rarities if they exist
        $scope.selectedRaritiesQuery.length > 0? `&rarity=${$scope.selectedRaritiesQuery}`: "",
        // Add selected types if they exist
        $scope.selectedTypesQuery.length > 0? `&type=${$scope.selectedTypesQuery}`: "",
        // Add selected superTypes if they exist
        $scope.selectedSuperTypesQuery.length > 0 ? `&supertypes=${$scope.selectedSuperTypesQuery}`: "",
        // Add selected subTypes if they exist
        $scope.selectedSubTypesQuery.length > 0? `&subtypes=${$scope.selectedSubTypesQuery}`: "",
        // Add page number and page size
        `&page=${$scope.pageNumber}&pageSize=${$scope.pageSize}`,
      ];

      // Join into one line and trim
      const finalQuery = queryParts.join("").trim();

      // Set the query in the service
      searchBarService.setQuery(finalQuery);

      
    };

    // Watch for changes in search option and modify the search bar accordingly
    $scope.$watch(
      function () {
        // get the current search option
        return searchBarService.getSearchOption();
      },
      function (searchOption) {
        // set the search option to the current search option
        $scope.searchoption = searchOption;
      }
    );
  },
});
