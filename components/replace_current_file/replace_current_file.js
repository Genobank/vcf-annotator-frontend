function replace_current_file_component(registration){
    console.log(registration)
    return /*html*/ `
    <div class="card border border-0 out-focus-container ancestry-border blured_card" >
        <div class="card-body ancestry-border " >
            <div class="card shadow border border-0 rounded-4" style="max-width: 55rem;">
                <div class="card-body">
                    <h5 class="display-6 fs-3 text-danger">
                        <i class="fa-solid fa-circle-exclamation" ></i>
                        File Processing Issue
                    </h5>
                    <hr>
                    <div class="alert alert-danger" role="alert">
                        <p>We couldn't process your uploaded file. This usually happens when:</p>
                        <ul>
                            <li>The file format isn't supported (we need .vcf or .txt files)</li>
                            <li>The file is corrupted or incomplete</li>
                            <li>The genetic data format doesn't match our supported formats (23andMe or standard VCF)</li>
                        </ul>
                        <p>Please try uploading a different file or <a href="mailto:support@genobank.io">contact our support team</a> for assistance.</p>
                    </div>
                    <div class="display-5 fs-5">
                        <div class= " h6 ">
                            Your current file is: '<strong>${registration?.register?.original_filename}</strong>'
                        </div>
                    </div>
                    <div class="d-grid gap-2 col-8  mx-auto">
                        <form>
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Please upload a compatible genetic data file (<strong>.vcf</strong> or <strong>.txt</strong>)</label>
                                <input class="form-control" type="file" id="updateFileInput" accept=".vcf,.txt" onchange="validateUpdateFileInput()">
                            </div>
                            <button type="button" class="btn btn-primary" disabled id="updateFileButton" onclick="updateFileHandler()">Update File</button>
                            <div class="progress" style="height: 4px;">
                                <div class="progress-bar bg-danger" id="id-progress-uploading-file" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </form>
                    </div>
                    <div class="mt-5 d-grid  mx-auto text-center">
                        If you think this is an error, please contact us at  <a href="mailto:support@genobank.io">support@genobank.io</a>.
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function validateUpdateFileInput(){
    let file = document.getElementById('updateFileInput').files[0];
    let fileExtension = file.name.split('.').pop().toLowerCase();
    let updateFileButton = document.getElementById('updateFileButton');
    if(fileExtension !== 'txt' && fileExtension !== 'vcf'){
        alert('Please upload a .vcf or .txt file');
        updateFileButton.disabled = true;
        return false;
    }
    updateFileButton.disabled = false;
    return true;
}

// async function updateFileHandler(){
//     let file = document.getElementById('updateFileInput').files[0];
//     let formData = new FormData();
//     formData.append('file', file);
//     await updateFile(getUserToken(), formData);
// }


async function updateFileHandler() {
    const btnContent = $("#updateFileButton").html()
    try{
        $("#updateFileButton").prop('disabled', true);
        $("#updateFileButton").html(`
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `)
        let file = document.getElementById('updateFileInput').files[0];
        const data = new FormData();
        const userSignature = getUserToken()
        data.append("file", file);
        data.append("data", JSON.stringify({
            user_signature: userSignature,
        }));

        const response = await postAxiosUpdateCurrentFile(data, onUploadingFile);
        if (response.status === 200){
            setTimeout(() => {
                window.location.reload(); // Recargar la página después de 5 segundos
            }, 500);
        }
    }catch(e){
        throw (e)
    }
    finally{
        $("#updateFileButton").prop('disabled', false);
        $("#updateFileButton").html(btnContent)
    }

}







function onUploadingFile (progressEvent) {
    $("#progress-text-info").show();
    const percentCompleted = (progressEvent.loaded / progressEvent.total) * 100;
    $("#id-progress-uploading-file").attr('style',`width: ${Math.round(percentCompleted)}%`)
    if (percentCompleted == 100){
        $("#progress-text-info").html("Validating and processing file");
    }
}
