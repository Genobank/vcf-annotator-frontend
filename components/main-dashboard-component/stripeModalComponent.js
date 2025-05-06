const AvailablePackages = {
    rare_coding: "Rare Coding Package",
    hereditary_cancer: "Hereditary Cancer Package",
    splicing: "Splicing Package",
    drug_interaction: "Drug Interaction Package",
    pathogenic_variant: "Pathogenic Variant Package"
}

function stripeModalComponent(selected_package, modalId) {
    const styles = /*html*/`
      <style>
        /* Variables */
        * { box-sizing: border-box; }
        form,
        .description {
          width: 100%;
          min-width: 500px;
          align-self: center;
          box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
                      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
                      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
          border-radius: 7px;
          padding: 40px;
          position: relative;
        }
        .hidden { display: none; }
        #payment-message {
          color: rgb(105, 115, 134);
          font-size: 16px; line-height: 20px;
          padding-top: 12px; text-align: center;
        }
        #payment-element { margin-bottom: 24px; }
        button { /* tu estilo de botón */ }
        .spinner,
        .spinner:before,
        .spinner:after { /* tu estilo de spinner */ }
  
        /* Ajuste para el botón de cierre dentro de la tarjeta */
        .description .btn-close {
          position: absolute;
          top: 16px;
          right: 16px;
        }

        .text-bg-custom {
            background-image: linear-gradient(180deg, rgb(1, 104, 240), rgb(0, 153, 255));
            color:rgb(255, 255, 255);
            }


      </style>
    `;
  
    return /*html*/`
      ${styles}
      <!-- Modal -->
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="container">
                <div class="row h-100">
                  <div class="col d-flex flex-column justify-content-center align-items-center">
                    <div class="card text-bg-custom description" style="max-width: 500px;">
                      <button type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"></button>
  
                      <div class="card-body text-center">
                        <h5 class="h4">You wil pay:</h5>
                        <h5 class="h2 ">$4.99 USD</h5>
                        <h5 class="h5 mt-4">for:</h5>
                        <h5 class="h2">${AvailablePackages[selected_package]}</h5>
                        <p id="purchase-description"></p>
                      </div>
                    </div>
  
                    <!-- Payment Form -->
                    <form id="payment-form" style="max-width: 500px;">
                      <div id="payment-element"><!-- Stripe.js injects here --></div>
                      <button id="submit" class="btn btn-primary mt-3 w-100">
                        <div class="spinner hidden" id="spinner"></div>

                        <span id="button-text">Pay now</span>
                      </button>
                      <div id="payment-message" class="hidden"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  