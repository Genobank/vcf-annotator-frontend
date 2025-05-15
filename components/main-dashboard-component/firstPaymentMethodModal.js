function firstPaymentMethodModal(selected_package, modalId) {
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
  
  return /*html*/ `
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
                        <h5 class="h4">Select your payment method</h5>
                      </div>
                    </div>
  
                    <form >
                      <button  class="btn btn-primary mt-3 w-100" onclick="handleOpenPaymentModal('${selected_package}', '${modalId}')">
                        <span id="button-text">Continue with Stripe  <i class="fa-solid fa-arrow-right"></i> </span>
                      </button>

                      <div class="text-center mt-3">or</div>
                      <hr>
                      <div><small>If you have a <b>gift code:</b></small></div>

                      <div class="input-group  mt-0 mb-2" >
                        <input type="text" class="form-control" id="gift-code" placeholder="Sample: AAAA-AAAA-AAAA-AAAA" aria-label="Gift code" style="height: 31px;" oninput="validateApplyButton()" maxlength="19">
                        <button class="btn btn-outline-secondary btn-sm" type="button" id="apply-button" disabled onclick="handleValidateGiftCode('${selected_package}')">Apply</button>
                        </div>
                        <div class="text-danger" id="error-message"></div>



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


async function handleOpenPaymentModal(selected_package, modalId) {
    $("#" + modalId).modal("hide");
    await openPaymentModal(selected_package);
}

async function handleValidateGiftCode(packageString) {
  const giftCode = $('#gift-code').val();
  const isValid = /^[A-Z0-9]{4}(?:-[A-Z0-9]{4}){3}$/.test(giftCode);
  const applyButton = $('#apply-button');
  const prevButtonContent = applyButton.html();
  const errorMessageDiv = $('#error-message');
  errorMessageDiv.html('');
  if (isValid) {
    try {
      applyButton.prop('disabled', true);
      applyButton.html('<i class="fa-solid fa-spinner fa-spin"></i> Validating...');
      const userSignature = getUserToken();
      const response = await postAnnotateUsingGiftCode(giftCode, userSignature, packageString);
      // reload
      startAnalysisViewProcess();
      window.location.reload();
    } catch (error) {
      console.log("\n\n\n log response IF ERROR", error)
      applyButton.html(prevButtonContent);
      applyButton.prop('disabled', false);
      console.log(error)
      errorMessageDiv.html(error);
    }
  } else {
    alert("Invalid gift code format.");
  }
}

function validateApplyButton() {
  const giftCode = $('#gift-code').val();
  const isValid = /^[A-Z0-9]{4}(?:-[A-Z0-9]{4}){3}$/.test(giftCode);
  $('#apply-button').prop('disabled', !isValid);
}
