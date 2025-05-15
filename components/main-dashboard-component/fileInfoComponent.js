function fileInfoComponent(nftData) {
  const {
    name,
    filename,
    fingerprint,
    user_wallet,
    ip_description,
    ip_id,
    token_id,
    ip_asset_url,
    license_terms_id,
    tx_hash,
    createdAt
  } = nftData;
  
  // Formatear la fecha de creación
  const formattedDate = new Date(createdAt).toLocaleDateString();
  
  // Crear versión abreviada del fingerprint y tx_hash
  const shortFingerprint = `${fingerprint.substring(0, 8)}...${fingerprint.substring(fingerprint.length - 5)}`;
  const shortTxHash = `${tx_hash.substring(0, 8)}...${tx_hash.substring(tx_hash.length - 5)}`;
  
  // Extraer el primer license_terms_id
  const firstLicenseId = license_terms_id && license_terms_id.length > 0 ? license_terms_id[0] : "N/A";

  return /*html */`
    <div class="card mb-4 service-card border-0">
      <div class="card-body p-4 ps-lg-5 pe-lg-5">
        <div class="row">
          <div class="col-md-8">
            <div class="d-flex align-items-center mb-4">
              <div class="rounded-circle bg-primary p-3 text-white me-3" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-file-signature fa-lg"></i>
              </div>
              <div>
                <h4 class="mb-1">${name}</h4>
                <span class="badge bg-success">Verified</span>
              </div>
            </div>
            <p class="text-muted mb-4">${ip_description}</p>
            <div class="row g-4">
              <div class="col-md-6">
                <div class="d-flex">
                  <div class="text-muted me-3"><i class="fas fa-file"></i></div>
                  <div>
                    <small class="text-muted d-block mb-1">File name</small>
                    <span>${filename}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex">
                  <div class="text-muted me-3"><i class="fas fa-fingerprint"></i></div>
                  <div>
                    <small class="text-muted d-block mb-1">Fingerprint</small>
                    <span class="text-truncate d-inline-block" style="max-width: 200px;" title="${fingerprint}">${shortFingerprint}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex">
                  <div class="text-muted me-3"><i class="fas fa-wallet"></i></div>
                  <div>
                    <small class="text-muted d-block mb-1">Wallet</small>
                    <span class="text-truncate d-inline-block" style="max-width: 200px;">${user_wallet}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex">
                  <div class="text-muted me-3"><i class="fas fa-calendar-alt"></i></div>
                  <div>
                    <small class="text-muted d-block mb-1">Created</small>
                    <span>${formattedDate}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex">
                  <div class="text-muted me-3"><i class="fas fa-file-contract"></i></div>
                  <div>
                    <small class="text-muted d-block mb-1">License ID</small>
                    <span>${firstLicenseId}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex">
                  <div class="text-muted me-3"><i class="fas fa-exchange-alt"></i></div>
                  <div>
                    <small class="text-muted d-block mb-1">Transaction</small>
                    <span class="text-truncate d-inline-block" style="max-width: 200px;" title="${tx_hash}">${shortTxHash}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-4 mt-md-0">
            <div class="card bg-light">
              <div class="card-body p-4">
                <!-- Digital Certificate Image -->
                <div class="text-center mb-4">
                  <div style="background-color: #f8f9fa; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                    <img src="/images/VCFNFTThumnail.png" alt="Digital Certificate" class="img-fluid" />
                  </div>
                  <h5 class="service-price">Your Digital Certificate ID: ${token_id}</h5>
                </div>
                <div class="mt-4">
                  <div class="small text-muted mb-2">Blockchain Reference:</div>
                  <div class="d-flex align-items-center justify-content-center mb-4">
                    <span class="text-truncate" style="max-width: 150px;">${ip_id}</span>
                    <button class="btn btn-sm btn-link ms-2" title="Copy"><i class="fas fa-copy"></i></button>
                  </div>
                  <a href="${ip_asset_url}" target="_blank" class="btn btn-outline-primary w-100">
                    <i class="fas fa-external-link-alt me-2"></i>View Certificate Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}