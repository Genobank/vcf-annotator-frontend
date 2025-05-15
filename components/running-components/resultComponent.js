function resultsComponent(path_list){
    // Extract file names from paths
    const file_list = path_list;
    
    // Group files by type/extension for better organization
    const sqliteFiles = file_list.filter(file => file.endsWith('.sqlite') || file.endsWith('.db'));
    const reportFiles = file_list.filter(file => file.endsWith('.html') || file.endsWith('.pdf') || file.endsWith('.txt'));
    const outputFiles = file_list.filter(file => file.endsWith('.vcf') || file.endsWith('.tsv') || file.endsWith('.csv'));
    const otherFiles = file_list.filter(file => 
        !sqliteFiles.includes(file) && 
        !reportFiles.includes(file) && 
        !outputFiles.includes(file)
    );
    
    // Helper function to get appropriate icon for file type
    function getFileIcon(fileName) {
        if (fileName.endsWith('.sqlite') || fileName.endsWith('.db')) return 'fa-database';
        if (fileName.endsWith('.html')) return 'fa-file-code';
        if (fileName.endsWith('.pdf')) return 'fa-file-pdf';
        if (fileName.endsWith('.txt')) return 'fa-file-alt';
        if (fileName.endsWith('.vcf')) return 'fa-dna';
        if (fileName.endsWith('.tsv') || fileName.endsWith('.csv')) return 'fa-table';
        return 'fa-file';
    }
    
    // Helper function to create file list items with icons and download functionality
    function createFileItems(path_list) {
        return path_list.map(path => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <i class="fas ${getFileIcon(path.split('/').pop())} me-2 text-primary"></i>
                    ${path.split('/').pop()}
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary" onclick="downloadFile('${path}')">
                        <i class="fas fa-download me-1"></i> Download
                    </button>
                </div>
            </li>
        `).join('');
    }
    
    return /*html */`
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-primary bg-gradient text-white">
                <h5 class="mb-0">
                    <i class="fas fa-flask me-2"></i>
                    Analysis Results
                </h5>
            </div>
            <div class="card-body">
                <p class="text-muted mb-3">
                    Your VCF annotation has generated the following result files. You can download them individually for detailed review.
                </p>
                
                ${sqliteFiles.length > 0 ? `
                <div class="mb-3">
                    <h6 class="border-bottom pb-2">
                        <i class="fas fa-database me-2"></i>
                        Database Files
                    </h6>
                    <ul class="list-group list-group-flush">
                        ${createFileItems(sqliteFiles)}
                    </ul>
                </div>
                ` : ''}
                
                ${reportFiles.length > 0 ? `
                <div class="mb-3">
                    <h6 class="border-bottom pb-2">
                        <i class="fas fa-file-medical-alt me-2"></i>
                        Reports
                    </h6>
                    <ul class="list-group list-group-flush">
                        ${createFileItems(reportFiles)}
                    </ul>
                </div>
                ` : ''}
                
                ${outputFiles.length > 0 ? `
                <div class="mb-3">
                    <h6 class="border-bottom pb-2">
                        <i class="fas fa-table me-2"></i>
                        Data Files
                    </h6>
                    <ul class="list-group list-group-flush">
                        ${createFileItems(outputFiles)}
                    </ul>
                </div>
                ` : ''}
                
                ${otherFiles.length > 0 ? `
                <div class="mb-3">
                    <h6 class="border-bottom pb-2">
                        <i class="fas fa-file me-2"></i>
                        Other Files
                    </h6>
                    <ul class="list-group list-group-flush">
                        ${createFileItems(otherFiles)}
                    </ul>
                </div>
                ` : ''}
                
                <div class="alert alert-info mt-3">
                    <i class="fas fa-info-circle me-2"></i>
                    <strong>BioNFT Status:</strong> All analysis results have been tokenized and secured on the Story Protocol blockchain.
                </div>
            </div>
            <div class="card-footer bg-light">
                <button class="btn btn-primary" onclick="downloadAllResults()">
                    <i class="fas fa-download me-1"></i> Download All Results
                </button>
                <button class="btn btn-outline-secondary" onclick="viewAnalysisDetails()">
                    <i class="fas fa-search-plus me-1"></i> View Analysis Details
                </button>
            </div>
        </div>
    `;
}

// Function to handle individual file download 
async function downloadFile(filePath) {
    const presignedLink = await getPresignedResultFileDownloadLink(getUserToken(), filePath);
    console.log("this is the presigned link", presignedLink)
    window.open(presignedLink?.link, '_blank');
}

// Function to download all result files as a zip
function downloadAllResults() {
    console.log('Downloading all result files');
    // Implement actual bulk download functionality
}

// Function to view detailed analysis information
function viewAnalysisDetails() {
    console.log('Viewing analysis details');
    // Implement modal or new view to show detailed analysis information
}