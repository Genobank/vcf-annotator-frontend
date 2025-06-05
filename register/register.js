let registerFormData;
let fileToUpload;
let isLoadedFile
let importedFileObj = {};
let fileUploadedData
let selectedImportFilePath = "";
let  hasLocalFile;
let  hasImportPath;

const pageURL = $(location).attr("href");




let steperComponent = new Stepper("#stepperContainer", [
    {"title": "Authentication", "content":step1Component()},
    {"title": "Register", "content":step2Component()},
    {"title": "Consent", "content":step3Component()},
    {"title": "Finish", "content":step4Component()}
],1);

if (isLoggedIn()){
    steperComponent.setStep(1)
}

function prevStep() {
    steperComponent.previousStep()
}

function nextStep() {
    steperComponent.nextStep()
}

function prontSavedTempForm(){
    console.log("saved form data", registerFormData)
}

async function closingWalletSession(){
    await disconnectWallet();
    localStorage.clear();
    window.location.href = "/login/";
}