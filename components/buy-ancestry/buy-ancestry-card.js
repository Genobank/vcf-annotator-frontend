function buy_ancestry_card() {
    return /*html*/ `
        <div class="card border border-0 out-focus-container ancestry-border blured_card" >
            <div class="card-body ancestry-border " >
                <div class="card" >
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-8">
                                <h4>Discover Your Genetic Heritage with SOMOS</h4>
                                <p>Using the same genetic data you've already uploaded, our ancestry analysis reveals your unique genetic heritage map, showing connections to populations around the world.</p>
                                <p><strong>With SOMOS Ancestry you'll receive:</strong></p>
                                <ul>
                                    <li>Detailed breakdown of your genetic heritage across global regions</li>
                                    <li>Interactive visualization of your ancestry composition</li>
                                    <li>Insights into migration patterns that shaped your genetic story</li>
                                    <li>Additional historical and cultural context for your results</li>
                                </ul>
                                <p>Results are available immediately after processing and stored securely in your account.</p>
                            </div>
                            <div class="col-md-4 text-center">
                                <img src="/images/ancestry-info-fondo.png" alt="Ancestry Analysis" class="img-fluid mb-3" style="max-width: 200px;">
                                <div class="pricing-box p-3 bg-light rounded">
                                    <span class="d-block price-text">$46.00 USD</span>
                                    <span class="d-block small">(One-time payment)</span>
                                    <button class="btn btn-primary mt-2 w-100" onclick="getPaymentModal()">Unlock Ancestry Analysis</button>
                                </div>
                            </div>
                        </div>

                        <div class="card border-0 mt-5">
                            <div class="card-body border rounded">
                                <h5>Have a promotional code?</h5>
                                <p>If you received a promotional code for ancestry analysis, enter it here:</p>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Enter your promotional code" id="id-input-hash-code" onkeyup="validateInput()">
                                    <button class="btn btn-outline-primary" type="button" id="id-validate-hashcode-button" onclick="validateHashCodeHandler()" disabled>
                                        Apply Code
                                    </button>
                                </div>
                                <div id="hash-message-warning" class="text-danger mt-2" style="display: none;"></div>
                            </div>
                        </div>

                        <div class="mt-4 mb-3">
                            <h5 class="text-center">Sample Analysis Preview</h5>
                            <div class="text-center">
                                <img class="img-fluid rounded" src="/images/ancestry_animation.gif" alt="Ancestry Analysis Preview">
                            </div>
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