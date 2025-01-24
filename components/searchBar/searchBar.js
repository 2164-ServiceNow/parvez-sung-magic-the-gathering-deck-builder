angular.module("searchBar", []).component("searchbar", {
  templateUrl: "components/searchBar/searchBar.html",
  controller: function SearchBarCtrl($scope, searchBarService) {
    $scope.searchoption = "card";

    $scope.searchValue = ""; // ng-model, default for search value
    $scope.pageNumber = 1; // default for page number
    $scope.pageSize = 20; // default for number of cards per page
    $scope.cmcValue = 1; // variable from cummulatie mana cost

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

    const searchInput = document.getElementById("searchValue");
    const filterCollapse = document.getElementById(
      "panelsStayOpen-collapseOne"
    );
    const accordianButton = document.getElementById("accordianButton");
    const searchBarContainer = document.getElementById("searchBarContainer");

    // filterCollapse.style.transition = "height 1s ease";

    document.addEventListener("click", function (event) {
      if (!searchBarContainer.contains(event.target)) {
        // filterCollapse.classList.remove('show');
        if (filterActive) {
          accordianButton.click();
          filterActive = false;
        }
      }
    });
    filterActive = false;
    searchInput.addEventListener("focus", function (event) {
      console.log("Search input has focus");
      if (!filterActive) {
        accordianButton.click();
        filterActive = true;
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
      console.log(array);
      if (name === "selectAll" && value === true) {
        array.forEach((item) => {
          item.value = true;
        });
      } else if (name === "selectAll" && value === false) {
        array.forEach((item) => {
          item.value = false;
        });
      } else if (name !== "selectAll" && value === false) {
        array[0].value = false;
      } else {
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
      $scope.selectedColorsQuery = $scope.joinArrayMembers($scope.colors);
      $scope.selectedRaritiesQuery = $scope.joinArrayMembers($scope.rarities);
      $scope.selectedTypesQuery = $scope.joinArrayMembers($scope.types);
      $scope.selectedSuperTypesQuery = $scope.joinArrayMembers(
        $scope.superTypes
      );
      $scope.selectedSubTypesQuery = $scope.joinArrayMembers($scope.subTypes);

      const queryParts = [
        $scope.searchValue.length > 0 ? `&name=${$scope.searchValue}` : "",
        $scope.selectedColorsQuery.length > 0
          ? `&colors=${$scope.selectedColorsQuery}`
          : "",
        $scope.selectedRaritiesQuery.length > 0
          ? `&rarity=${$scope.selectedRaritiesQuery}`
          : "",
        $scope.selectedTypesQuery.length > 0
          ? `&type=${$scope.selectedTypesQuery}`
          : "",
        $scope.selectedSuperTypesQuery.length > 0
          ? `&supertypes=${$scope.selectedSuperTypesQuery}`
          : "",
        $scope.selectedSubTypesQuery.length > 0
          ? `&subtypes=${$scope.selectedSubTypesQuery}`
          : "",
        `&page=${$scope.pageNumber}&pageSize=${$scope.pageSize}`,
      ];

      // Join into one line and trim
      const finalQuery = queryParts.join("").trim();

      searchBarService.setQuery(finalQuery);

      // searchBarService.resetDetails();
    };

    $scope.$watch(
      function () {
        return searchBarService.getSearchOption();
      },
      function (searchOption) {
        $scope.searchoption = searchOption;
      }
    );
  },
});
