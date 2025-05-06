function startFinishViewComponent(filename, statusText = 'Completed', logs='', package_string, color, stripped) {
    stripped = stripped ? 'progress-bar-striped' : '';


    return /*html*/`
      <div class="card w-100 mb-3">
        <div class="card-body">
          <p class="h4">Package: ${package_string}</p>
          <!-- Nombre de archivo -->
          <h6 class="card-subtitle mb-3 text-truncate">${filename}</h6>
          
          <!-- Barra de progreso + icono -->
          <div class="d-flex align-items-center mb-2">
            <div class="progress flex-grow-1" role="progressbar" aria-label="Animated striped example"
                 aria-valuenow="100"
                 aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar text-bg-${color} ${stripped} progress-bar-animated"
                   style="width: 100%">
              </div>
            </div>
            <i class="fa-solid fa-rotate ms-2"></i>
          </div>
          
          <!-- Texto de estado -->
          <div class="text-muted small">${statusText}</div>

          <div class="mt-3">
            <h6 class="text-muted">Logs:</h6>
            <pre class="text-muted small" style="max-height: 200px; overflow-y: auto;">${logs}</pre>
          </div>

        </div>
      </div>
    `;
  }
  