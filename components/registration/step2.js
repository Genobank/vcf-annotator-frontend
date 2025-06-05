let userWallet;
let isValidWallet = false;


function step2Component() {
    return /* html */ `
<div class="main-content ">
    <div class="card-body">
        <div class="row">
            <div class="col-md-6">
                <div class="d-flex justify-content-center">
                    <img class="img-raw-data" src="img/VCFThumbnailSquare_02.png"><br>
                </div>
            </div>
            <div class="col-md-6">
                <p class="h5 text-center">Registration Information</p>
                <label for="genderInput" class="form-label">User Wallet</label>
                <div class="mb-3">
                    <div class="input-group ">
                        <input type="text" class="form-control" placeholder="${userWallet}"
                            aria-label="Disabled input example" disabled>
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                            onclick="closingWalletSession()">Log out</button>
                    </div>
                    <div class="form-text text-danger" style="display: none;" id="wallet-message-warning">This wallet is
                        already registered </div>
                </div>
                <div class="mb-5">
                    <!-- <label for="filetypeInput" class="form-label">*Select your raw data companie</label>-->

                    <div class="card border-0 mt-4">
                        <div class="card-body border">
                            <label for="inputGroupFile03" class="form-label">*select Local File</label>
                            <div class="input-group mb-3">
                                <input type="file" class="form-control" id="inputGroupFile03" accept=".vcf,.txt"
                                    aria-describedby="inputGroupFileAddon03" aria-label="Upload"
                                    onchange="validateRegistrationInputs()">
                                <button class="btn btn-outline-secondary" type="button" id="btn-inputGroupFile03"
                                    onclick="removeFileFromInput()">X</button>
                            </div>

                            <div class="mt-4">
                                <p>OR import it from your Genobank.io Dashboard</p>
                                <button class="btn btn-primary" type="button" id="btn-open-import-modal"
                                    onclick="openImporVCFtModal()">Selecf VCF</button>
                                <span id="importSelectedFileSection" style="display: none">
                                    <span>
                                        <i class="fa-solid fa-file"></i>
                                        <span id="importSelectedFileName"></span>
                                        <button class="btn " type="button" id="btn-import-vcf"
                                        onclick="removeFileFromImportInput()">X</button>
                                    <span>
                                </span>
                            </div>
                            <div id="fileInstructions" class="mt-3 text-secondary">
                                <div class="alert alert-info" role="alert">
                                    <h5 class="h6 fs-5">VCF Annotation and Tokenization</h5>
                                    <p>Your privacy and data ownership are our top priorities. Here's what happens when you upload your VCF file:</p>
                                    <ol>
                                        <li>Your genetic variants are analyzed using OpenCravat, a powerful annotation tool</li>
                                        <li>Results are securely stored and tokenized as BioNFTs on the Story Protocol blockchain</li>
                                        <li>A unique digital fingerprint secures your ownership claim (we don't expose your full genetic information)</li>
                                        <li>You maintain complete control with your digital wallet</li>
                                        <li>Access your annotated datasets and visualization tools through your dashboard</li>
                                    </ol>
                                    <p class="mt-2"><strong>Accepted formats:</strong> VCF files (.vcf) or 23andMe text files (.txt)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-grid gap-2">
                    <button type="button" class="btn btn-danger btn-somos" onclick="saveRegisterDraft()"
                        id="nextButton">
                        Next
                        <i class="fa-solid fa-arrow-right"></i>
                        
                    </button>
                </div>
                <div clase="container" id="saveRegisterDraftWarningMessage"></div>

            </div>
        </div>
    </div>
</div>
<script>(async function () { useEffect() })();</script>
`;
}

async function useEffect() {
    userWallet = getUserWallet();
    document.querySelector("input[placeholder]").placeholder = userWallet;

    const registration = await getRegisteredUser(getUserToken());
    isValidWallet = isEmpty(registration.register);
    // redirect if is registered diabled only for demo purposes
    if (!isValidWallet) {
        window.location.href = window.environment + "/";
        $("#wallet-message-warning").show("slow");
    }

    $('input[name="flexRadioDefault"]').on("change", function () {
        // Remover la clase 'active' de todos los labels
        $(".btn-radio").removeClass("active");

        // Agregar la clase 'active' al label del radio button seleccionado
        $(this).closest(".btn-radio").addClass("active");
    });
}

async function validateRegistrationInputs() {
    const fileInput = $("#inputGroupFile03").prop("files");
    const importedFilesCount = Object.keys(importedFileObj).length;
    const hasImportedFile = selectedImportFilePath !== "";
    const hasLocalFile = fileInput.length > 0;
    const hasDashboardFile = importedFilesCount > 0;
    if (hasLocalFile) {
        $("#btn-import-from-genovault").attr("disabled", true);
        $("#btn-open-import-modal").attr("disabled", true);
    } else if (hasDashboardFile || hasImportedFile) {
        $("#inputGroupFile03").attr("disabled", true);
        $("#btn-inputGroupFile03").attr("disabled", true);
        if (hasDashboardFile) {
            $("#btn-open-import-modal").attr("disabled", true);
        }
        if (hasImportedFile) {
            $("#btn-import-from-genovault").attr("disabled", true);
        }
    } else {
        $("#btn-import-from-genovault").attr("disabled", false);
        $("#btn-open-import-modal").attr("disabled", false);
        $("#inputGroupFile03").attr("disabled", false);
        $("#btn-import-vcf").attr("disabled", false);
    }
}

function saveRegisterDraft() {
    $("#saveRegisterDraftWarningMessage").html(``);
    const fileInput = document.getElementById("inputGroupFile03").files[0];
    console.log("fileinput", fileInput);
    let selectedFile = fileInput;
    
    // Solo manejar archivos locales o del dashboard anterior en selectedFile
    if (!selectedFile) {
        const importedFileNames = Object.keys(importedFileObj);
        if (importedFileNames.length === 1) {
            selectedFile = importedFileObj[importedFileNames[0]].content;
        }
    }
    
    // Validación: debe haber exactamente UNA opción seleccionada
    hasLocalFile = selectedFile !== undefined;
    hasImportPath = selectedImportFilePath !== "";
    
    if (!hasLocalFile && !hasImportPath) {
        $("#saveRegisterDraftWarningMessage").html(/*html */ `
            <div class="alert alert-danger" role="alert">
                Please select a file (either upload a local file OR select from import)
            </div>
        `);
        throw new Error("Please select a file to upload");
    }
    
    // Si hay archivo local, validar que no sea ZIP
    if (hasLocalFile && selectedFile.name && selectedFile.name.toLowerCase().endsWith(".zip")) {
        $("#saveRegisterDraftWarningMessage").html(/*html */ `
            <div class="alert alert-warning" role="alert">
                <p class="h5 fs-5">⚠️ Compressed File Detected</p>
                <p>We need your uncompressed genetic data file to properly analyze your DNA. Please extract the file first:</p>
                <ol>
                    <li>Locate the ZIP file on your computer</li>
                    <li>Right-click and select "Extract All..." or use your computer's extraction tool</li>
                    <li>Find the extracted file in the resulting folder (look for .vcf or .txt file)</li>
                    <li>Upload that file instead</li>
                </ol>
                <p>Need help? <a href="mailto:support@genobank.io">Contact our support team</a></p>
            </div>
        `);
        return;
    }
    
    // Solo setear fileToUpload si hay archivo local
    if (hasLocalFile) {
        fileToUpload = selectedFile;
    }
    
    registerFormData = {
        user_signature: getUserToken(),
        domain: "VCFANNOTATOR",
    };
    
    nextStep();
}

async function importFromGenovault() {
    const importButton = $("#btn-import-from-genovault");
    importedFileObj = {};
    try {
        $("#inputGroupFile03").attr("disabled", true);
        $("#btn-inputGroupFile03").attr("disabled", true);
        importButton.attr("disabled", true);
        importButton.html(/*html */ `
            <i class="fa-solid fa-spinner fa-spin-pulse"></i>
            Connecting to Dashboard...
        `);
        const userSign = getUserToken();
        const fileRoutes = await importFileRoutes(userSign);
        await drawImportedFiles(fileRoutes, userSign);
    } catch (e) {
        console.error(e);
    } finally {
        importButton.html(`Import from Genovault`);
    }
}

async function processFileRoutes(fileRoutes, userSign) {
    let importedFilesDivListHtml = ``;
    let filesCount = 0;
    const totalFiles = fileRoutes.length;
    for (const file of fileRoutes) {
        filesCount++;
        $("#btn-import-from-genovault").html(/*html */ `
            <i class="fa-solid fa-spinner fa-spin-pulse"></i>
            Importing ${filesCount} of ${totalFiles}
        `);
        const fileContent = await getContentFromFileUrl(
            userSign,
            file.path,
            file.type,
            file.original_name
        );
        importedFileObj[file.filename] = {
            route: file,
            content: fileContent,
        };
    }
    return importedFileObj;
}

async function drawImportedFiles(fileRoutes, userSign) {
    const countFilesLabel = $("#id-count-files");
    const importedFilesDiv = $("#importedFilesDiv");
    countFilesLabel.html("");
    try {
        countFilesLabel.html(`Found ${fileRoutes.length} file(s)`);
        const importedFiles = await processFileRoutes(fileRoutes, userSign);
        const filesQuantity = Object.keys(importedFiles).length;
        let filesCount = 0;
        let importedFilesDivListHtml = "";
        for (const [index, filename] of Object.keys(importedFiles).entries()) {
            filesCount++;
            const safeId = `file-${index}`;
            importedFileObj[filename].safeId = safeId;
            $("#btn-import-from-genovault").html(/*html */ `
                <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                Importing ${filesCount} of ${filesQuantity}
            `);
            importedFilesDivListHtml += /*html */ `
            <div class="card mb-2" style="width: 18rem;" id="${safeId}">
                <div class="card-body p-2">
                    <span class="card-text">
                        ${shortText(
                            importedFileObj[filename].route.original_name,
                            20,
                            6
                        )}
                        <button type="button" class="btn-close float-end" aria-label="Close"
                            onclick="removeFileFromInputFileList('${safeId}')"></button>
                    </span>
                </div>
            </div>
            `;
        }
        importedFilesDiv.html(importedFilesDivListHtml);
        validateRegistrationInputs();
    } catch (e) {
        console.error(e);
    } finally {
        $("#btn-import-from-genovault").html(`Import from Genovault`);
    }
}

function removeFileFromInputFileList(safeId) {
    let filename = null;
    for (const [key, value] of Object.entries(importedFileObj)) {
        if (value.safeId === safeId) {
            filename = key;
            break;
        }
    }
    if (filename) {
        delete importedFileObj[filename];
        $(`#${safeId}`).remove(); 
    }
    const remainingFilesCount = Object.keys(importedFileObj).length;
    if (remainingFilesCount === 0) {
        $("#inputGroupFile03").attr("disabled", false);
        $("#btn-inputGroupFile03").attr("disabled", false);
        $("#btn-import-from-genovault").attr("disabled", false);
    }
    validateRegistrationInputs();
}

function removeFileFromInput() {
    const fileInput = document.getElementById("inputGroupFile03");
    fileInput.value = "";
    $("#btn-import-vcf").attr("disabled", false);
    $("#importedFilesDiv").html("");
    validateRegistrationInputs();
}

function releaseinputFile() {
    $("#inputGroupFile03").attr("disabled", false);
}


async function openImporVCFtModal(){
    // const userSignature = getUserToken()
    // const vcfFilesPath = await getUserVCFToImport (userSignature)
    // console.log(vcfFilesPath)

    $("#modalContainer").html(modalImportVCF())
    $("#modalContainer").modal("show")

}


function modalImportVCF(){
    return /*html */`
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">VCF Import</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="modal-body-import">
          Loading files...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" disabled id="selectImportVCFButton" onclick="selectVCFFile()">Select this file</button>
        </div>
      </div>
    </div>
    `
}

async function renderAvailableFiles(){
    try{
        const userSignature = getUserToken()
        const vcfFilesPath = await getUserVCFToImport (userSignature)
        let filesDivHtml = ""
        for (vcfFile of vcfFilesPath){
            console.log(vcfFile)
            filesDivHtml += /*html */`
            <div class="form-check" onclick="enableSelectButton()">
                <input class="form-check-input" type="radio" name="radioDefault" id="${vcfFile}">
                <label class="form-check-label" for="${vcfFile}">
                    ${vcfFile}
                </label>
            </div>
            `
        }

        $("#modal-body-import").html(filesDivHtml)
    } catch(e){
        $("#modal-body-import").html("Error during getting VCF files")
    }
}

function enableSelectButton(){
    $("#selectImportVCFButton").attr("disabled", false)
}

function selectVCFFile() {
    const selectedRadio = document.querySelector('input[name="radioDefault"]:checked');
    if (selectedRadio) {
        selectedImportFilePath = selectedRadio.id;
        const fileName = selectedImportFilePath.split('/').pop();
        document.getElementById("importSelectedFileName").textContent = fileName;
        $("#importSelectedFileSection").show();
        $("#modalContainer").modal("hide");
        validateRegistrationInputs();
    } else {
        console.error("No se ha seleccionado ningún archivo");
    }
}


function removeFileFromImportInput() {
    selectedImportFilePath = "";
    document.getElementById("importSelectedFileName").textContent = "";
    $("#importSelectedFileSection").hide();
    validateRegistrationInputs();
    console.log("Archivo importado removido");
}


document.addEventListener('shown.bs.modal', function (event) {
    if (event.target.id === 'modalContainer') {
        renderAvailableFiles();
    }
});

