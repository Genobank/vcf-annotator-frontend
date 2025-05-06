
const texts = [
    { text: "Processing file...", delay: 2000 },
    { text: "Minting NFT...", delay: 10000 },
    { text: "Saving Metadata...", delay: 2000 },
    { text: "Finishing...", delay: 1000000 }
];

let currentIndex = 0;
let animationActive = false;
function step3Component() {
    return /*html */`
    <div class="main-content bg-light first-card starting-card ">
        <div class="card-body" id="consents-content">
            <div class="consent-text">
                <h5>FORMAL NOTICE OF RESCISSION AND ASSERTION OF DATA RIGHTS</h5>
                <p><strong>Effective Date: <span id="current-date"></span></strong></p>
                
                <p>Notwithstanding any prior consent or agreement, as of the date of acceptance of this contract ("Effective Date"), User expressly rescinds, revokes, and withdraws any and all rights, permissions, consents, licenses, or authorizations previously granted to 23andMe, Inc. ("23andMe"), including its subsidiaries, affiliates, service providers, related entities, successors, and assigns, in connection with any DNA data uploaded, genetic information provided, or Medical Record Information shared, pursuant to 23andMe's Terms of Service, Privacy Statement, Medical Record Privacy Notice, or any other related policy or agreement.</p>
                
                <ol>
                    <li><strong>BASIS FOR RESCISSION:</strong> The basis for this rescission is the initiation of bankruptcy proceedings by 23andMe under Chapter 11 of the United States Bankruptcy Code, which constitutes a material change in circumstances affecting the rights and protections originally relied upon by User. This substantial and unforeseen change in circumstances renders the original consent void or voidable under principles of contract law and applicable data protection regulations.</li>
                    
                    <li><strong>IMMEDIATE CESSATION OF USE:</strong> 23andMe shall immediately cease any further use, disclosure, processing, storage, or transfer of User's DNA data, genetic information, Medical Record Information, and any associated personal information, except as strictly required by applicable law or regulatory obligations. This includes but is not limited to research projects, commercial partnerships, and any data licensing arrangements.</li>
                    
                    <li><strong>PROHIBITION ON TRANSFER IN BANKRUPTCY:</strong> User explicitly prohibits the transfer, sale, assignment, or inclusion of their genetic data, DNA samples, or personal information as an asset in any bankruptcy proceeding, restructuring plan, or subsequent sale of 23andMe's assets. User asserts that their personal genetic information constitutes personal property that cannot be liquidated or transferred without explicit new consent.</li>
                    
                    <li><strong>DATA PORTABILITY AND DELETION RIGHTS:</strong> Pursuant to applicable data protection laws, including but not limited to the California Consumer Privacy Act (CCPA), General Data Protection Regulation (GDPR), and other relevant regulations, User demands:
                        <ol type="a">
                            <li>The immediate provision of a complete copy of all User's genetic data and personal information in a machine-readable, interoperable format;</li>
                            <li>Verification of permanent deletion of all User's genetic data, DNA samples, and personal information from all 23andMe systems, databases, backups, and archives following the provision of said data.</li>
                        </ol>
                    </li>
                    
                    <li><strong>SUCCESSOR LIABILITY:</strong> This rescission and all rights assertions herein shall apply to any successor entity, purchaser of assets, reorganized entity, or other third party that may acquire any portion of 23andMe's assets, operations, or data through bankruptcy proceedings or otherwise.</li>
                    
                    <li><strong>RESERVATION OF RIGHTS:</strong> User expressly reserves all rights and remedies available under applicable law, including but not limited to rights under data protection laws, consumer protection statutes, breach of contract claims, and rights to seek damages or equitable relief for any unauthorized use or transfer of User's data.</li>
                    
                    <li><strong>NOTICE OF OWNERSHIP REGISTRATION:</strong> User hereby provides notice that they have registered ownership of their genetic data through GenoBank.io's BioNFT™ technology, establishing an immutable record of data ownership on blockchain infrastructure. This registration serves as evidence of User's assertion of exclusive ownership rights in their genetic information.</li>
                    
                    <li><strong>GOVERNING LAW:</strong> This rescission shall be governed by the laws of User's jurisdiction of residence and applicable federal laws.</li>
                </ol>
            </div>
        </div>
        <div class="form-check mt-5  m-3">
            <input class="form-check-input custom-checkbox" type="checkbox" value="" id="flexCheckDefault" onchange="validateAgreement()">
            <label class="form-check-label ms-2" for="flexCheckDefault" >
                I acknowledge that I have read and understood the above legal notice and wish to rescind all prior consents granted to 23andMe and assert full ownership rights over my genetic data through GenoBank.io's BioNFT™ technology.
            </label>

            <div class="d-grid gap-2 mt-3">
                <button class="btn btn-somos me-md-2" type="button" onclick="finalize()" disabled id="btn-finalize">Sign Legal Notice</button>
                <button class="btn btn-secondary me-md-2" type="button" onclick="prevStep()">Back</button>
            </div>
        </div>
        <div class="progress" style="height: 4px;">
            <div class="progress-bar bg-danger" id="id-progress-uploading-file" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div id="progress-text-info" style="display: block;">
            <div class="text-center H1 fs-6" id="dinamic-progress-text">
            </div>
        </div>
    </div>
    `
}


function showModalError(title, message, options = {}) {
    stopProgressAnimation();
    const defaults = {
        closeButtonText: '<i class="fa-solid fa-person-walking-arrow-loop-left"></i> Previous step', 
        modalSize: 'dialog-centered modal-lg ',
        modalId: 'errorModal_' + Date.now(),
        onClose: null
    };
    const settings = {...defaults, ...options};
    const existingModal = document.getElementById(settings.modalId);
    if (existingModal) {
        existingModal.remove();
    }
    const modalHTML = /*html */`
    <div class="modal fade" id="${settings.modalId}" tabindex="-1" aria-labelledby="${settings.modalId}Label" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog ${settings.modalSize ? 'modal-' + settings.modalSize : ''}">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="${settings.modalId}Label">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${message}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="prevStep()">${settings.closeButtonText}</button>
                </div>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modalElement = document.getElementById(settings.modalId);
    if (typeof settings.onClose === 'function') {
        modalElement.addEventListener('hidden.bs.modal', settings.onClose);
    }
    modalElement.addEventListener('hidden.bs.modal', function() {
        modalElement.remove();
    });
    const bsModal = new bootstrap.Modal(modalElement);
    bsModal.show();
    return bsModal;
}

function animateProgressiveText() {
    if (!animationActive) return;
    const textContainer = $("#dinamic-progress-text");
    console.log("currentIndex", currentIndex);
    const currentText = texts[currentIndex];
    console.log("currentText", currentText);
    textContainer.html(currentText.text);
    currentIndex = (currentIndex + 1) % texts.length;
    if (animationActive) {
        setTimeout(animateProgressiveText, currentText.delay);
    }
}

function startProgressAnimation() {
    animationActive = true;
    currentIndex = 0; // Reset index
    animateProgressiveText();
}

// Function to stop the animation
function stopProgressAnimation() {
    animationActive = false;
    // Clear the text
    $("#dinamic-progress-text").html("");
}

function validateAgreement(){
    $("#btn-finalize").prop('disabled', !$("#flexCheckDefault").is(':checked'));
}

async function finalize() {
    try{
        $("#btn-finalize").prop('disabled', true);
        $("#btn-finalize").html(`
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `)
        const consentsText = getConsentsText();
        const signedConsents = await signPersonalMessage(consentsText)
        registerFormData["signedConsents"] = signedConsents
        const data = new FormData();
        data.append("data", JSON.stringify(registerFormData));
        data.append("file", fileToUpload);
        const response = await postAxiosRegisterUser(data, onUploadingFile);
        if (response.status === 200){
            fileUploadedData = response.data
            const registration = await getRegisteredUser(getUserToken())
            const isRegistered = !isEmpty(registration.register)
            if (isRegistered) {
                setLocalRegistration(registration)
                nextStep()
            }else{
                stopProgressAnimation();
                const userCurrentWallet = getUserWallet()
                const errorTitle = "Registration Process Failed";
                const errorMessage = /*html */`
                    <p>Your registration could not be completed.</p>
                    <p>Please return to step 2 and try again. If you think this is an error, please contact us at <a href="mailto:support@genobank.io">support@genobank.io</a> and include your wallet information.</p>
                    <p>Wallet: <strong>${userCurrentWallet} </strong> </p>
                `;
                showModalError(errorTitle, errorMessage)
            }
        }
    }catch(e){
        console.log("error to show on modal", e)
        stopProgressAnimation();
        const errotTitle = e?.response?.data?.status || "Error"
        const errorMessage = e?.response?.data?.status_details?.description || "An error ocurred during the registration process, please return to step 2 and try again."
        showModalError(errotTitle, errorMessage)
    }
    finally{
        $("#btn-finalize").prop('disabled', false);
        $("#btn-finalize").html(`Consent and ownership`)
    }
}



function onUploadingFile (progressEvent) {
    $("#progress-text-info").show();
    const percentCompleted = (progressEvent.loaded / progressEvent.total) * 100;
    $("#id-progress-uploading-file").attr('style',`width: ${Math.round(percentCompleted)}%`)
    if (percentCompleted == 100){
        startProgressAnimation();
    }
}

function getConsentsText() {
    const consentsContent = document.getElementById('consents-content');
    const textWithoutHtml = consentsContent.innerText || consentsContent.textContent;
    return textWithoutHtml;
}