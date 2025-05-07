function startFinishViewComponent(filename, statusText = 'Completed', logs='', package_string, color, stripped) {
    stripped = stripped ? 'progress-bar-striped' : '';
    
    // Determine if success or error
    const isSuccess = color === 'success';
    const alertType = isSuccess ? 'success' : 'danger';
    const alertIcon = isSuccess ? 'check-circle' : 'exclamation-circle';
    const alertTitle = isSuccess ? 'Analysis Complete!' : 'Analysis Failed';
    const alertMessage = isSuccess ? 
      'Your genetic data analysis is ready. View your results below.' :
      'There was an issue analyzing your genetic data. Please check the details below or contact support.';

    return /*html*/`
      <div class="card w-100 mb-3">
        <div class="card-body">
          <div class="alert alert-${alertType}" role="alert">
            <h5><i class="fa-solid fa-${alertIcon}"></i> ${alertTitle}</h5>
            <p>${alertMessage}</p>
          </div>
          
          <div class="row mb-3">
            <div class="col-md-6">
              <p class="mb-1"><strong>Analysis Package:</strong></p>
              <p class="h5 mb-3">${package_string}</p>
            </div>
            <div class="col-md-6">
              <p class="mb-1"><strong>Analyzed File:</strong></p>
              <p class="text-truncate">${filename}</p>
            </div>
          </div>
          
          <!-- Barra de progreso + icono -->
          <div class="d-flex align-items-center mb-2">
            <div class="progress flex-grow-1" role="progressbar" aria-label="Analysis progress"
                 aria-valuenow="100"
                 aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar text-bg-${color} ${stripped} progress-bar-animated"
                   style="width: 100%">
              </div>
            </div>
            <i class="fa-solid fa-${isSuccess ? 'check' : 'exclamation'} ms-2"></i>
          </div>
          
          <!-- Texto de estado -->
          <div class="text-${color}"><strong>Status:</strong> ${statusText}</div>

          <div class="mt-3">
            <h6 class="text-muted">Processing Details:</h6>
            <pre class="text-muted small" style="max-height: 200px; overflow-y: auto;">${logs}</pre>
          </div>

        </div>
      </div>
    `;
  }
  