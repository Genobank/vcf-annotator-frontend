function startRunningViewComponent(filename, statusText = 'Running', logs = '') {
    return /*html*/`
      <div class="card w-100 mb-3">
        <div class="card-body">
          <div class="alert alert-info" role="alert">
            <h5><i class="fa-solid fa-spinner fa-spin"></i> Analysis in Progress</h5>
            <p>We're currently analyzing your genetic data. This typically takes 3-5 minutes to complete.</p>
            <p class="mb-0">Your results will appear automatically when the analysis is complete.</p>
          </div>
          
          <h6 class="card-subtitle mb-3 text-truncate"><strong>File:</strong> ${filename}</h6>
          
          <!-- Barra de progreso + icono -->
          <div class="d-flex align-items-center mb-2">
            <div class="progress flex-grow-1" role="progressbar" aria-label="Animated striped example"
                 aria-valuenow="100"
                 aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar text-bg-secondary progress-bar-striped progress-bar-animated"
                   style="width: 100%">
              </div>
            </div>
            <i class="fa-solid fa-rotate fa-spin ms-2"></i>
          </div>
          
          <!-- Texto de estado -->
          <div class="text-muted small"><strong>Status:</strong> ${statusText}</div>
          <!-- Logs -->
          <div class="mt-3">
            <h6 class="text-muted">Processing Details:</h6>
            <pre class="text-muted small" style="max-height: 200px; overflow-y: auto;">${logs}</pre>
          </div>
        </div>
      </div>
    `;
  }
  