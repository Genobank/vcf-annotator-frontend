function startFinishViewComponent(filename, statusText = 'Completed', logs='', package_string, color, stripped, oc_ipasset_url="", ml_ipasset_url="") {

    console.log("oc_ipasset_url", oc_ipasset_url)
    console.log("ml_ipasset_url", ml_ipasset_url)
    // Determine if success or error
    const isSuccess = color === 'success';
    const headerClass = isSuccess ? 'bg-success' : 'bg-danger';
    const alertIcon = isSuccess ? 'check-circle' : 'exclamation-triangle';
    const alertTitle = isSuccess ? 'VCF Annotation Complete!' : 'Analysis Failed';
    
    // Format the package name for display
    const formattedPackage = package_string
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    // Create a timestamp for the completion time
    const completionTime = new Date().toLocaleString();

    return /*html*/`
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header ${headerClass} bg-gradient text-white">
          <h5 class="mb-0">
            <i class="fas fa-${isSuccess ? 'flask' : 'exclamation-circle'} me-2"></i>
            ${alertTitle}
          </h5>
        </div>
        <div class="card-body">
          ${isSuccess ? `
            <div class="alert alert-success d-flex">
              <div class="me-3">
                <i class="fa-solid fa-${alertIcon} fa-2x"></i>
              </div>
              <div>
                <h5 class="alert-heading">Analysis Successfully Completed</h5>
                <p class="mb-0">Your VCF file has been successfully analyzed and the results are ready. The analysis has been tokenized as a BioNFT on the Story Protocol blockchain.</p>
              </div>
            </div>
          ` : `
            <div class="alert alert-danger d-flex">
              <div class="me-3">
                <i class="fa-solid fa-${alertIcon} fa-2x"></i>
              </div>
              <div>
                <h5 class="alert-heading">Analysis Process Failed</h5>
                <p class="mb-0">We encountered an issue while processing your VCF file. Please review the logs below for details or contact our support team for assistance.</p>
              </div>
            </div>
          `}
          
          <div class="row mb-4">
            <div class="col-md-6">
              <div class="card bg-light">
                <div class="card-body">
                  <h6 class="card-subtitle text-muted mb-2">Analysis Package</h6>
                  <div class="d-flex align-items-center">
                    <i class="fas fa-cube text-${color} me-2 fs-4"></i>
                    <span class="h5 mb-0">${formattedPackage}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card bg-light">
                <div class="card-body">
                  <h6 class="card-subtitle text-muted mb-2">Processed File</h6>
                  <div class="d-flex align-items-center">
                    <i class="fas fa-dna text-${color} me-2 fs-4"></i>
                    <span class="fw-bold text-truncate">${filename}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          ${isSuccess ? `
            <div class="row mb-4">
              <div class="col-md-6">
                <div class="card border-left-primary h-100">
                  <div class="card-body">
                    <h6 class="text-primary border-bottom pb-2">
                      <i class="fas fa-cubes me-2"></i>
                      BioNFT Status
                    </h6>
                    <div class="d-flex align-items-center mt-3">
                      <div class="me-3">
                        <i class="fas fa-check-circle text-success fa-2x"></i>
                      </div>
                      <div>
                        <p class="mb-0">Successfully tokenized on Story Protocol blockchain</p>
                        <small class="text-muted">Created on: ${completionTime}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card border-left-primary h-100">
                  <div class="card-body">
                    <h6 class="text-primary border-bottom pb-2">
                      <i class="fas fa-chart-pie me-2"></i>
                      Analysis Summary
                    </h6>
                    <ul class="mt-3 mb-0 ps-3">
                      <li>OpenCravat analysis complete</li>
                      <li>Results files generated</li>
                      <li>SQLite database created</li>
                      <li>Interactive reports available</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-md-12 mt-4">
                <div class="card border-left-primary h-100">
                  <div class="card-body">
                    <h6 class="text-primary border-bottom pb-2">
                      <i class="fas fa-cubes me-2"></i>
                      Generated
                    </h6>
                    <div class="mt-3 row g-3">
                      <!-- Card 1: Claude -->
                      <div class="col-md-4">
                        <a href="https://claude.genobank.app/" target="_blank" class="text-decoration-none">
                          <div class="card h-100 shadow-sm border-0 card-hover">
                            <div class="card-body text-center d-flex flex-column">
                              <div class="mb-3">
                                <img src="images/claudeicon.bmp" 
                                    alt="Claude AI" 
                                    class="img-fluid rounded-circle mb-2" 
                                    style="width: 80px; height: 80px;">
                              </div>
                              <h6 class="card-title text-primary mb-2">Ask Claude.ai</h6>
                              <p class="card-text text-muted small mb-auto">About my results</p>
                              <div class="mt-auto">
                                <span class="btn btn-primary btn-sm">
                                  <i class="fas fa-external-link-alt me-1"></i>
                                  Open
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>

                      <!-- Card 2: Open Cravat Analysis -->
                      <div class="col-md-4">
                        <a href="${oc_ipasset_url}" target="_blank" class="text-decoration-none">
                          <div class="card h-100 shadow-sm border-0 card-hover">
                            <div class="card-body text-center d-flex flex-column">
                              <div class="mb-3">
                                <img src="images/oc_ipa.jpg" 
                                    alt="Open Cravat Analysis" 
                                    class="img-fluid rounded-circle mb-2" 
                                    style="width: 80px; height: 80px;">
                              </div>
                              <h6 class="card-title text-primary mb-2">Open Cravat Analysis</h6>
                              <p class="card-text text-muted small mb-auto">IPAsset</p>
                              <div class="mt-auto">
                                <span class="btn btn-primary btn-sm">
                                  <i class="fas fa-external-link-alt me-1"></i>
                                  Open
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>

                      <!-- Card 3: ML Analysis -->
                      <div class="col-md-4">
                        <a href="${ml_ipasset_url}" target="_blank" class="text-decoration-none">
                          <div class="card h-100 shadow-sm border-0 card-hover">
                            <div class="card-body text-center d-flex flex-column">
                              <div class="mb-3">
                                <img src="images/ml_ipa.jpg" 
                                    alt="ML Analysis" 
                                    class="img-fluid rounded-circle mb-2" 
                                    style="width: 80px; height: 80px;">
                              </div>
                              <h6 class="card-title text-primary mb-2">ML Analysis</h6>
                              <p class="card-text text-muted small mb-auto">IPAsset</p>
                              <div class="mt-auto">
                                <span class="btn btn-primary btn-sm">
                                  <i class="fas fa-external-link-alt me-1"></i>
                                  Open
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ` : ''}
          
          <div class="card bg-light">
            <div class="card-body">
              <h6 class="text-muted mb-2">
                <i class="fas fa-terminal me-2"></i>
                Processing Logs
              </h6>
              <pre class="bg-dark text-light p-3 small rounded" style="max-height: 200px; overflow-y: auto;">${logs}</pre>
            </div>
          </div>
        </div>
        ${isSuccess ? `
          <div class="card-footer bg-light">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="badge bg-success">
                  <i class="fas fa-check me-1"></i> Completed
                </span>
                <small class="text-muted ms-2">Finished at: ${completionTime}</small>
              </div>
              <a href="#resultsFolderContainer" class="btn btn-primary">
                <i class="fas fa-arrow-down me-1"></i> View Results
              </a>
            </div>
          </div>
        ` : `
          <div class="card-footer bg-light">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="badge bg-danger">
                  <i class="fas fa-times me-1"></i> Failed
                </span>
                <small class="text-muted ms-2">Attempted at: ${completionTime}</small>
              </div>
              <button class="btn btn-primary" onclick="retryAnalysis()">
                <i class="fas fa-redo me-1"></i> Retry Analysis
              </button>
            </div>
          </div>
        `}
      </div>
      
      <style>
        .border-left-primary {
          border-left: 4px solid #4e73df;
        }
      </style>
    `;
  }
  
  // Function to handle analysis retry
  function retryAnalysis() {
    console.log('Retrying analysis');
    // Implement retry functionality
  }
  