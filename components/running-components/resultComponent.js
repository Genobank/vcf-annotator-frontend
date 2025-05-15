function resultsComponent(path_list){
    return /*html */`
        <div class="card w-100 mb-3">
            <div class="card-body">
                <h6 class="card-subtitle mb-3 text-truncate">Results</h6>
                <ul class="list-group list-group-flush">
                    ${path_list.map(path => `<li class="list-group-item" onclick=(downloadFile('${path}'))><i class="fa-solid fa-arrow-down"></i> ${path.split('/').pop()} `).join('')}
                </ul>
            </div>
        </div>
    
    `
}

async function downloadFile(filePath) {
    const presignedLink = await getPresignedResultFileDownloadLink(getUserToken(), filePath);
    console.log("this is the presigned link", presignedLink)
    window.open(presignedLink?.link, '_blank');
}