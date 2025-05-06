function buy_ancestry_card() {
    return /*html*/ `
        <div class="card border border-0 out-focus-container ancestry-border blured_card" >
            <div class="card-body ancestry-border " >
                <div class="card" >
                    <div class="card-body">
                        <h5 class="h3 fs-3 ">Unlock your ancestry with SOMOS</h5>
                        <hr>
                        <div class="card">
                            <div class="card-body">
                                <p class="display-5 fs-6">You haven't purchased  our ancestry service yet. Don't miss out! Click the button below to use your credit/debit card.</p>
                                <div class="text-center mb-5">
                                    <button class="btn btn-outline-primary somos-btn col-6 mx-auto" onclick="getPaymentModal()">Unlock SOMOS Ancestry $46.00 USD </button>
                                    <p class="h1 fs-6 text-center">(One-time payment via Stripe)</p>
                                </div>

                                <div class="d-flex justify-content-center align-items-center">
                                    <strong>But</strong>
                                </div>
                                <div class="d-flex justify-content-center align-items-center display-6 fs-6">

                                    if you have a valid hash code, you can validate it here:
                                </div>


                                
                                <div class="mt-2">
                                    <div class="card p-3">
                                        <div class="d-flex justify-content-center align-items-center gap-3">
                                            <div class="form-group mb-0">
                                                <input 
                                                    type="text" 
                                                    class="form-control" 
                                                    id="id-input-hash-code" 
                                                    placeholder="Enter your hash code"
                                                    onkeyup="validateInput()"
                                                >
                                                <div id="hash-message-warning" class="text-danger mt-2" style="display: none;"></div>
                                            </div>
                                            <button 
                                                id="id-validate-hashcode-button" 
                                                class="btn btn-primary" 
                                                onclick="validateHashCodeHandler()" 
                                                disabled
                                                style="max-width: 200px;"
                                            >
                                                Validate Hash Code
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                

                            </div>
                        </div>
                        <div class="pe-5 ps-5 mt-4 mb-5">
                            <div class="text-center mb-3">Preview</div>
                            <img class="w-100" src="/images/ancestry_animation.gif">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


async function validateHashCodeHandler(){
    const originalTextButton = $("#id-validate-hashcode-button").html()
    try{
        $("#id-input-hash-code, #id-validate-hashcode-button").attr("disabled", true);
        $("#hash-message-warning").hide()
        $("#id-validate-hashcode-button").html(`
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Loading...</span>
        `)
        const userHashCode = $("#id-input-hash-code").val()
        const userSignature  = getUserToken()
        const validated = await validateHashCode(userSignature, userHashCode)
        console.log(validated)


        // throw new Error(`Invalid hash code`)

        window.location.reload()

    }catch (error) {
        console.error(error);
        console.log(error);
        console.log("error")
        $("#id-input-hash-code, #id-validate-hashcode-button").attr("disabled", false);
        const errorDescription = error?.status_details?.description != undefined ? error.status_details?.description : "An error occurred validating the hash"
        $("#id-validate-hashcode-button").html(originalTextButton)
        $("#hash-message-warning").html(errorDescription)
        $("#hash-message-warning").show()
    }

}


async function validateHashCode(userSignature, hashCode) {
    const url = `${window.VCF_APP_API}/validate_hash_code`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userSignature, hashCode })
        });
		if (!response.ok) {
            const errorResponse = await response.json(); // Intentamos obtener el cuerpo de la respuesta
            // throw new Error(`Error ${response.status}: ${errorResponse.message || 'Unknown error'}`);
            throw errorResponse
        }
        const data = await response.json();
        return data
    
    
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


function validateInput() {
    const input = $("#id-input-hash-code").val(); // Obtener el valor del input
    const button = $("#id-validate-hashcode-button"); // Seleccionar el botón

    // Validar que el input no esté vacío y que tenga al menos 12 caracteres
    if (input.length >= 12) {
        button.prop("disabled", false); // Activar el botón
    } else {
        button.prop("disabled", true); // Desactivar el botón
    }
}
