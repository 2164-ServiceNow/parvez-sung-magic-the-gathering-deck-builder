angular
  .module("cardDetailsModal", [])
  .directive("cardDetailsModal", function () {
    return {
      restrict: "E",
      scope: {
        modalCard: "=",
        imgPlaceHolder : "@", // Two-way binding for the card data
      },
      template: `


<div
  class="modal fade"
  id="cardModal"
  tabindex="-1"
  aria-labelledby="cardModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h5 class="modal-title" id="cardModalLabel">{{modalCard.name}}</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <!-- Cards List -->

        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="{{modalCard.imageUrl || imgPlaceHolder}}"
              class="img-fluid rounded-start"
              alt="{{card.name}}"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{modalCard.name}}</h5>
              <p class="card-text">{{modalCard.originalText}}</p>
              <p class="card-text">{{modalCard.flavor}}</p>
              <h5 class="card-title">Power: {{modalCard.power}}</h5>
              <p class="card-text">
                Super Type: {{modalCard.superTypes}}, Card Type:
                {{modalCard.type}}, Sub Type: {{modalCard.subTypes}}
              </p>
              <p class="card-text">Rarity: {{modalCard.rarity}}</p>
              <p class="card-text">CMC: {{modalCard.cmc}}</p>
              <p class="card-text">Mana Cost: {{modalCard.manaCost}}</p>
              <p class="card-text">
                <small class="text-body-secondary"
                  >Last updated 3 mins ago</small
                >
              </p>
            </div>
          </div>
        </div>

        <!-- End of Cards List -->
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
      </div>
    </div>
  </div>
</div>`,
    };
  });
