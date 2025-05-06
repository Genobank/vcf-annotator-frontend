


let linkComponent = ""

function step4Component(){
    return /* html */`
            <div class="main-content" >
                <div class="card-body">
                    <div class="d-flex justify-content-center">
                        <div class="card shadow bg-body-tertiary " style="width: 30rem;">
                            <img src="/images/GenoBank.io_logo_icon.svg" class="card-img-top" alt="...">
                            <div class="d-flex justify-content-center">
                                <img src="/images/GenoBank.io_logo@2xname.png" alt="..." style="width: 50%;">
                            </div>

                            <div class="card-body ">
                                <div class="d-flex justify-content-center">
                                    <img src="/images/story-logo-black.avif"  style="width: 6rem;">
                                </div>
                                <div class="text-center mb-2">
                                    <div class="display-5 fs-3">
                                        BioIP property claimed! <br>
                                        on Story
                                    </div>
                                    <span>
                                    <div id="id-tx-hash-component">
                                    
                                    </div>
                                </div>
                                <!--
                                <div class="somos-btn text-center mt-5 w-100" onclick="redirectToPage('/')">Go To Dashboard</div>
                                -->
                                <div class="login-button text-center mt-5 w-100" onclick="redirectToPage('/')">Go To Dashboard</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script>(async function() {step4useEffect()})();</script>
    `
}

async function step4useEffect(){
    console.log("using fileUploadedData", fileUploadedData)
    console.log("using fileUploadedData.data", fileUploadedData.data)
    
    const fileUploadedTx = `https://www.storyscan.io/tx/${fileUploadedData.data.tx_hash}`
    linkComponent = /*html */`
        <div class="display-6 fs-6">
            <a href="${fileUploadedTx}" target="_blank">
                ${fileUploadedTx}
            </a>
        </div>  
    ` 
    
    // $("#id-tx-hash-component").html(linkComponent)
}