angular.module("searchBar", []).component("searchbar", {
  templateUrl: "components/searchBar/searchBar.html",
  controller: function SearchBarCtrl($scope, searchBarService) {
    $scope.pageNumber = 0; // default for page number
    $scope.pageSize = 20; // default for number of cards per page
    $scope.cmcValue = 0; // variable from cummulatie mana cost

    // Color selection goes here
    $scope.selectedColors = []; //selects colors in the search
    $scope.searchValue = ""; // text that is to be searched

    // NG-Model array for colors to be selected
    $scope.colors = [
      { name: "white", value: false },
      { name: "blue", value: false },
      { name: "black", value: false },
      { name: "red", value: false },
      { name: "green", value: false },
    ];

    // toggle All function for colors
    $scope.toggleAll = function (array, selectAll, key = "value") {
      array.forEach((item) => (item[key] = selectAll));
    };

    // if all colors are selected used in the toggle
    $scope.selectAllColors = false;

    $scope.updateSelectAll = function (array, key = "value") {
      $scope.selectAllColors = array.every((item) => item[key]);
    };

    $scope.joinArrayMembers = function (
      array,
      key = "value",
      nameKey = "name"
    ) {
      return array
        .filter((item) => item[key]) // Filter where key is true
        .map((item) => item[nameKey]) // Extract names using nameKey
        .join(","); // Join with commas
    };

    // array to put selected rarities in
    $scope.selectedRarities = [];

    // level of card Rarities include Common, Uncommon, Rare, Mythic Rare, Special, Basic Land
    $scope.rarities = [
      { name: "Common", value: false },
      { name: "Uncommon", value: false },
      { name: "Rare", value: false },
      { name: "Mythic Rare", value: false },
      { name: "Special", value: false },
      { name: "Basic Land", value: false },
    ];

    // toggle variable for rarity selection
    $scope.selectAllRarities = false;

    // array to put selected superTypes in
    $scope.selectedSuperTypes = [];

    // superTypes of cards include Basic, Legendary, Snow, World, Ongoing, Elite, Host, Saga
    $scope.superTypes = [
      { name: "Basic", value: false },
      { name: "Legendary", value: false },
      { name: "Snow", value: false },
      { name: "World", value: false },
      { name: "Ongoing", value: false },
      { name: "Elite", value: false },
      { name: "Host", value: false },
      { name: "Saga", value: false },
    ];

    // toggle variable for superType selection
    $scope.selectAllSuperTypes = false;

    // array to put selected types in
    $scope.selectedTypes = [];

    // types of cards include Creature, Enchantment, Instant, Sorcery, Artifact, Planeswalker, Land
    $scope.types = [
      { name: "Creature", value: false },
      { name: "Enchantment", value: false },
      { name: "Instant", value: false },
      { name: "Sorcery", value: false },
      { name: "Artifact", value: false },
      { name: "Planeswalker", value: false },
      { name: "Land", value: false },
    ];

    // toggle variable for type selection
    $scope.selectAllTypes = false;

    // array to put selected subTypes in
    $scope.selectedSubTypes = [];

    // unique subTypes of cards
    $scope.subTypes = [
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

    $scope.search = function () {
      console.log($scope.colors);
      searchBarService.setQuery(
        `${
          $scope.colors.length > 0
            ? `colors=${$scope.joinArrayMembers($scope.colors)}&`
            : ""
        }
            ${
              $scope.rarities.length > 0
                ? `rarity=${$scope.joinArrayMembers($scope.rarities)}&`
                : ""
            }
            ${
              $scope.superTypes.length > 0
                ? `supertypes=${$scope.joinArrayMembers($scope.superTypes)}&`
                : ""
            }
            ${
              $scope.types.length > 0
                ? `types=${$scope.joinArrayMembers($scope.types)}&`
                : ""
            }
            ${
              $scope.subTypes.length > 0
                ? `subtypes=${$scope.joinArrayMembers($scope.subTypes)}&`
                : ""
            }
            page=${$scope.pageNumber}&pageSize=${$scope.pageSize}`.trim()
      );
      searchBarService.resetDetails();
      console.log("search");
    };
  },
});
