function startRunningViewComponent(filename, statusText = 'Running', logs = '') {
    // Determine the current step in the VCF annotation process
    const isStarting = logs.includes('Starting') || logs.includes('Initializing');
    const isAnnotating = logs.includes('Annotating') || logs.includes('OpenCravat');
    const isTokenizing = logs.includes('Creating') || logs.includes('BioNFT') || logs.includes('Token');
    const isCompleting = logs.includes('Finalizing') || logs.includes('Complete');
    
    // Calculate progress percentage based on the step
    let progressPercentage = 25; // Default to first step
    let statusLabel = "Initializing VCF analysis";
    
    if (isAnnotating) {
        progressPercentage = 50;
        statusLabel = "Running OpenCravat annotation";
    } else if (isTokenizing) {
        progressPercentage = 75;
        statusLabel = "Creating BioNFT on Story Protocol";
    } else if (isCompleting) {
        progressPercentage = 90;
        statusLabel = "Finalizing results";
    }
    
    return /*html*/`
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-primary bg-gradient text-white">
          <h5 class="mb-0">
            <i class="fas fa-microscope me-2"></i>
            VCF Annotation in Progress
          </h5>
        </div>
        <div class="card-body">
          <div class="alert alert-info d-flex align-items-center" role="alert">
            <div class="me-3">
              <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
            </div>
            <div>
              <h5 class="alert-heading">Analysis in Progress</h5>
              <p>We're processing your genetic data with OpenCravat. Analysis typically takes 3-5 minutes depending on your file size.</p>
              <p class="mb-0">Your results and BioNFT will appear automatically when complete.</p>
            </div>
          </div>
          
          <div class="row align-items-center mb-4">
            <div class="col-md-3">
              <h6 class="text-muted mb-1">Processing File:</h6>
              <div class="d-flex align-items-center">
                <i class="fas fa-dna me-2 text-primary"></i>
                <span class="text-truncate fw-bold">${filename}</span>
              </div>
            </div>
            <div class="col-md-9">
              <h6 class="text-muted mb-1">Current Status: <span class="fw-bold text-primary">${statusLabel}</span></h6>
              <div class="progress" style="height: 10px;" role="progressbar" aria-label="VCF annotation progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                     style="width: ${progressPercentage}%" 
                     aria-valuenow="${progressPercentage}" 
                     aria-valuemin="0" 
                     aria-valuemax="100">
                </div>
              </div>
            </div>
          </div>
          
          <div class="row mb-3">
            <div class="col-12">
              <h6 class="border-bottom pb-2 text-primary">
                <i class="fas fa-tasks me-2"></i>
                Analysis Steps
              </h6>
              <div class="d-flex justify-content-between text-center step-indicators">
                <div class="step-item ${progressPercentage >= 25 ? 'active' : ''}">
                  <div class="step-icon">
                    <i class="fas fa-upload ${progressPercentage >= 25 ? 'text-primary' : 'text-muted'}"></i>
                  </div>
                  <div class="step-label small ${progressPercentage >= 25 ? 'fw-bold' : 'text-muted'}">File Processing</div>
                </div>
                <div class="step-item ${progressPercentage >= 50 ? 'active' : ''}">
                  <div class="step-icon">
                    <i class="fas fa-dna ${progressPercentage >= 50 ? 'text-primary' : 'text-muted'}"></i>
                  </div>
                  <div class="step-label small ${progressPercentage >= 50 ? 'fw-bold' : 'text-muted'}">OpenCravat Analysis</div>
                </div>
                <div class="step-item ${progressPercentage >= 75 ? 'active' : ''}">
                  <div class="step-icon">
                    <i class="fas fa-cubes ${progressPercentage >= 75 ? 'text-primary' : 'text-muted'}"></i>
                  </div>
                  <div class="step-label small ${progressPercentage >= 75 ? 'fw-bold' : 'text-muted'}">BioNFT Creation</div>
                </div>
                <div class="step-item ${progressPercentage >= 90 ? 'active' : ''}">
                  <div class="step-icon">
                    <i class="fas fa-check-circle ${progressPercentage >= 90 ? 'text-primary' : 'text-muted'}"></i>
                  </div>
                  <div class="step-label small ${progressPercentage >= 90 ? 'fw-bold' : 'text-muted'}">Completion</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card bg-light">
            <div class="card-body">
              <h6 class="text-muted mb-2">
                <i class="fas fa-terminal me-2"></i>
                Processing Logs
              </h6>
              <pre class="bg-dark text-light p-3 small rounded" style="max-height: 200px; overflow-y: auto;">${logs || 'Initializing VCF annotation process...'}</pre>
            </div>
          </div>
        </div>
        <div class="card-footer bg-light">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted">Status last updated: <span id="last-update-time">${new Date().toLocaleTimeString()}</span></small>
            </div>
            <button class="btn btn-sm btn-outline-secondary" title="View more details about the analysis process">
              <i class="fas fa-info-circle me-1"></i> Analysis Info
            </button>
          </div>
        </div>
      </div>
      
      <style>
        .step-indicators {
          position: relative;
          margin: 20px 40px;
        }
        .step-indicators:before {
          content: '';
          position: absolute;
          top: 15px;
          left: 30px;
          right: 30px;
          height: 2px;
          background: #dee2e6;
          z-index: 0;
        }
        .step-item {
          position: relative;
          z-index: 1;
          width: 50px;
        }
        .step-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: white;
          border: 2px solid #dee2e6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 8px;
        }
        .step-item.active .step-icon {
          border-color: #0d6efd;
        }
      </style>
    `;
  }
  