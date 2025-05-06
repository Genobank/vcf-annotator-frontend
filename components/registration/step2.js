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
                            <label for="inputGroupFile03" class="form-label">*Select File (Only .vcf files
                                allowed)</label>
                            <div class="input-group mb-3">
                                <input type="file" class="form-control" id="inputGroupFile03" accept=".vcf"
                                    aria-describedby="inputGroupFileAddon03" aria-label="Upload"
                                    onchange="validateRegistrationInputs()">
                                <button class="btn btn-outline-secondary" type="button" id="btn-inputGroupFile03"
                                    onclick="removeFileFromInput()">X</button>
                            </div>
                            <div id="fileInstructions" class="mt-3 text-secondary">
                                <div class="alert alert-info" role="alert">
                                    <h5 class="h6 fs-5">Why is this necessary?</h5>
                                    <p>Genobank.io will process your VCF files as follows:</p>
                                    <ol>
                                        <li>Generate a fingerprint from your uploaded VCF files</li>
                                        <li>Create an NFT owned by Story (IPAsset) based on this fingerprint</li>
                                        <li>Store your files securely in our buckets</li>
                                        <li>Provide access to your files through your wallet</li>
                                    </ol>
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
    if (fileInput.length > 0 || importedFilesCount > 0) {
        $("#btn-import-from-genovault").attr("disabled", true);
        $("#inputGroupFile03").attr("disabled", importedFilesCount > 0);
        $("#btn-inputGroupFile03").attr("disabled", importedFilesCount > 0);
    } else {
        // Reactivar ambos si no hay archivos
        $("#btn-import-from-genovault").attr("disabled", false);
        $("#inputGroupFile03").attr("disabled", false);
        $("#btn-inputGroupFile03").attr("disabled", false);
    }
}

function saveRegisterDraft() {
    $("#saveRegisterDraftWarningMessage").html(``);
    const fileInput = document.getElementById("inputGroupFile03").files[0];
    console.log("fileinput", fileInput);
    let selectedFile = fileInput;
    if (!selectedFile) {
        const importedFileNames = Object.keys(importedFileObj);
        if (importedFileNames.length === 1) {
            selectedFile = importedFileObj[importedFileNames[0]].content;
        }
    }
    if (selectedFile === undefined) {
        $("#saveRegisterDraftWarningMessage").html(/*html */ `
            <div class="alert alert-danger" role="alert">
                Please select a file
            </div>
        `);
        throw new Error("Please select a file to upload");
    }
    if (selectedFile.name && selectedFile.name.toLowerCase().endsWith(".zip")) {
        $("#saveRegisterDraftWarningMessage").html(/*html */ `
            <div class="alert alert-danger" role="alert">
                <p class="h5 fs-5">⚠ ZIP File Detected </p>
                We've detected that you're trying to upload a compressed (.zip) file. To properly process your DNA data claim, we
                need the uncompressed text (.txt) file.
                Please follow these steps:
                <ol>
                    <li>Locate the ZIP file on your computer</li>
                    <li>Right-click and select "Extract All..." or use your computer's extraction tool</li>
                    <li>Find the extracted .txt file in the resulting folder</li>
                    <li>Return to this page and upload the .txt file instead</li>
                </ol>
                This ensures we can properly create your cryptographic DNA fingerprint while keeping your data on your device.
                Need help? Contact our support team at support@genobank.io
            </div>
        `);
        return;
    }
    fileToUpload = selectedFile;
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
    $("#btn-import-from-genovault").attr("disabled", false);
    $("#importedFilesDiv").html("");
    validateRegistrationInputs();
}

function releaseinputFile() {
    $("#inputGroupFile03").attr("disabled", false);
}