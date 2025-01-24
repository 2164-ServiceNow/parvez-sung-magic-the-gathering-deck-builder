angular.module("addToDeckModal", []).directive("addToDeckModal", function () {
  return {
    restrict: "E",
    scope: {
      modalCard: "=", // Two-way binding for the card data
      decks: "=", // Two-way binding for the list of decks
      // onAddToDeck: "&", // Callback for adding the card to a deck
      // selectedDeckIndex: "@", // Two-way binding for selectedDeckIndex
    },
    templateUrl: "pages/addToDeckModal/addToDeckModal.html",
    controller: function ($scope, deckService, ModalService) {
      $scope.decks=[]
      

      $scope.init =function(){
        $scope.decks = deckService.getDecks();  
        $scope.modalCard = ModalService.getCard();             
        if ($scope.decks.length > 0) {
          $scope.selectedDeckIndex = 0; // Default to the first deck
        }
        console.log(`selected Deck Index: ${$scope.selectedDeckIndex}`);
      }     
      $scope.init();
      
      
      
      

      // $scope.init =function(){
      //   $scope.decks = ModalService.getDecks();
      //   // $scope.modalCard = ModalService.getCard();
      //   // console.log($scope.decks);
      //   $scope.decks = deckService.getDecks();
      //   if ($scope.decks.length > 0) {
      //     $scope.selectedDeckIndex = 0; // Default to the first deck
      //   }
      //   // console.log($scope.decks);
      //   console.log(`selected Deck Index: ${$scope.selectedDeckIndex}`);

      // }

      // $scope.searchOption ='card';
    // $scope.$watch(
    //   function () {
    //     return ModalService.getCard();
    //   },
    //   function (card) {
    //     $scope.modalCard = card;
    //     console.log($scope.modalCard)
    //     // $scope.decks = deckService.getDecks();
    //   }
    // );

      $scope.changeIndex=function (index){
        $scope.selectedDeckIndex = index;
        console.log(`change to index ${$scope.selectedDeckIndex}}`)
      }

      $scope.addToDeck=function(){
        // console.log(decks);
        console.log($scope.modalCard);
        // ModalService.getCard();
        deckService.addToDeck(ModalService.getCard(), $scope.selectedDeckIndex)
      }

      // $scope.init();

      // Handle adding a card to the selected deck
      // $scope.handleAddToDeck = function () {
      //   if ($scope.selectedDeckIndex !== null && $scope.modalCard) {
      //     // Call the parent function (via the binding)
      //     $scope.onAddToDeck({
      //       card: $scope.modalCard,
      //       selectedDeckIndex: $scope.selectedDeckIndex
      //     });

      //     // Optional: Directly update decks via the service
      //     deckService.addToDeck(modalCard,selectedDeckIndex);
      //   }
      // };

      // // Call init when the controller loads

    },
  };
});

// angular
//   .module("magicApp")
//   .controller(
//     "AddToDeckModalController",
//     function ($scope, $uibModalInstance, card, decks) {
//       $scope.card = card;
//       $scope.decks = decks;
//       // Example: Close the modal and pass data back to the parent
//       $scope.selectDeck = function (selectedDeck) {
//         $uibModalInstance.close(selectedDeck); // Send the selected deck back
//       };

//       // Dismiss the modal
//       $scope.cancel = function () {
//         $uibModalInstance.dismiss("cancel");
//       };
//     }
//   );
