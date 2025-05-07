const stripe = Stripe(window.STRIPE_API_KEY);
let analysisViewIntervalId = null;


document.addEventListener('DOMContentLoaded', () => {
    (async () => {
        try {
            const job = await updateJobStatus(getUserToken());
            const isRunning = job?.status === 'Running';
            const isCompleted = job?.status === 'Completed';
            const package = job?.package;
            const wasActive = localStorage.getItem('analysisViewActive') === 'true';
            console.log("Job status:", job);
            console.log("Is running:", isRunning);
            console.log("Was active:", wasActive);

            if (isRunning || wasActive) {
                localStorage.setItem('analysisViewActive', 'true');
                startAnalysisViewProcess();
            }

            if (isCompleted) {
                const localRegistration = getLocalRegistration();
                const filename = localRegistration?.register?.filename;
                $("#analysisViewContainer").html(
                    startFinishViewComponent(filename, job.status, job?.logs.reverse().join('<br>'), package, "success", false)
                );

                const resultFiles = await getResultsFolder(getUserToken(), package);
                console.log("Result files:", resultFiles);
                $("#resultsFolderContainer").html(resultsComponent(resultFiles))

        
            }


        } catch (err) {
            console.error("Error al inicializar el polling de análisis:", err);
        }
    })();
});


function mainDashboardComponent(register) {
    return /*html */`
        ${fileInfoComponent(register)}
        
        <div class="container mt-4">
          <div class="card bg-light border-0">
            <div class="card-body">
              <h2 class="mb-3">Your DNA. Your Control.</h2>
              <p>Welcome to GenoBank.io's secure genetic analysis platform. We combine advanced genomic analysis with blockchain technology to give you privacy-focused insights while maintaining complete ownership of your genetic data.</p>
              <p>Your uploaded genetic data is protected using secure blockchain verification, allowing you to access personalized analysis packages without compromising your privacy.</p>
            </div>
          </div>
        </div>
        
        <div class="container mt-4">
          <div class="card bg-light mb-4">
            <div class="card-body">
              <h5>Your Data Ownership on the Blockchain</h5>
              <p>We use blockchain technology to provide you with:</p>
              <ul>
                <li><strong>Proof of Ownership</strong> - Your genetic data is represented by a secure digital certificate (NFT) on the blockchain</li>
                <li><strong>Privacy Protection</strong> - Only a fingerprint of your data is stored on the blockchain, not your actual genetic information</li>
                <li><strong>Control</strong> - Your digital wallet gives you exclusive access to your data and analysis results</li>
              </ul>
              <p class="small mb-0 text-muted">Technical details are available in the sidebar under "BioDataset Token"</p>
            </div>
          </div>
        </div>
        
        <div class="container mt-5" id="analysisViewContainer">
        </div>


        <div class="container mt-5" id="resultsFolderContainer">
        </div>

        <h4 class="mb-4">Available Packages</h4>
        <div class="row">
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card service-card h-100">
                    <div class="service-header package-1">
                        <div class="text-center">
                            <i class="fas fa-dna service-icon mb-2"></i>
                            <h5>Rare Variant Analysis</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="service-price mb-3">$4.99 / analysis</div>
                        <p class="card-text">Discover uncommon genetic variations that might affect your health. Understand what makes your genetics unique.</p>
                        <ul class="list-unstyled mb-4">
                            <li><i class="fas fa-check text-success me-2"></i> Identification of rare genetic variants</li>
                            <li><i class="fas fa-check text-success me-2"></i> Plain-language health significance explanations</li>
                            <li><i class="fas fa-check text-success me-2"></i> Comprehensive downloadable report</li>
                        </ul>
                        <button class="btn btn-primary w-100" data-bs-toggle="modal" data-service="Rare Coding Package" onclick="openPaymentModal('rare_coding')">
                            Select
                        </button>
                    </div>
                </div>
            </div>
            <!-- Package 2: Hereditary Cancer -->
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card service-card h-100">
                    <div class="service-header package-2">
                        <div class="text-center">
                            <i class="fas fa-heartbeat service-icon mb-2"></i>
                            <h5>Cancer Risk Insights</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="service-price mb-3">$4.99 / analysis</div>
                        <p class="card-text">Understand your genetic factors related to various cancer types. Knowledge is the first step in proactive health management.</p>
                        <ul class="list-unstyled mb-4">
                            <li><i class="fas fa-check text-success me-2"></i> Analysis of key cancer-related genes</li>
                            <li><i class="fas fa-check text-success me-2"></i> Personalized risk context (not a diagnosis)</li>
                            <li><i class="fas fa-check text-success me-2"></i> Guidance on next steps and discussions with healthcare providers</li>
                        </ul>
                        <button class="btn btn-primary w-100" data-bs-toggle="modal" data-service="Hereditary Cancer" onclick="openPaymentModal('hereditary_cancer')">
                            Select
                        </button>
                    </div>
                </div>
            </div>
            <!-- Package 3: Splicing Package -->
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card service-card h-100">
                    <div class="service-header package-3">
                        <div class="text-center">
                            <i class="fas fa-bezier-curve service-icon mb-2"></i>
                            <h5>Gene Expression Analysis</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="service-price mb-3">$4.99 / analysis</div>
                        <p class="card-text">Understand how your genes are expressed and functioning. Explore the mechanisms that make you unique.</p>
                        <ul class="list-unstyled mb-4">
                            <li><i class="fas fa-check text-success me-2"></i> Analysis of how your genes are processed</li>
                            <li><i class="fas fa-check text-success me-2"></i> Insights into potential functional impacts</li>
                            <li><i class="fas fa-check text-success me-2"></i> Advanced genetic expression mapping</li>
                        </ul>
                        <button class="btn btn-primary w-100" data-bs-toggle="modal" data-service="Splicing Package" onclick="openPaymentModal('splicing')">
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Segunda fila: 2 paquetes + espacio vacío -->
        <div class="row">
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card service-card h-100">
                    <div class="service-header package-4">
                        <div class="text-center">
                            <i class="fas fa-capsules service-icon mb-2"></i>
                            <h5>Medication Response Profile</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="service-price mb-3">$4.99 / analysis</div>
                        <p class="card-text">Discover how your genetics may influence reactions to certain medications. Share insights with your healthcare provider.</p>
                        <ul class="list-unstyled mb-4">
                            <li><i class="fas fa-check text-success me-2"></i> Analysis of medication processing genes</li>
                            <li><i class="fas fa-check text-success me-2"></i> Potential medication response insights</li>
                            <li><i class="fas fa-check text-success me-2"></i> Identification of possible reaction sensitivities</li>
                        </ul>
                        <button class="btn btn-primary w-100" data-bs-toggle="modal" data-service="Drug Interaction Package" onclick="openPaymentModal('drug_interaction')">
                            Select
                        </button>
                    </div>
                </div>
            </div>
            <!-- Package 5: Pathogenic Variant Package -->
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card service-card h-100">
                    <div class="service-header package-5">
                        <div class="text-center">
                            <i class="fas fa-biohazard service-icon mb-2"></i>
                            <h5>Health Variant Screening</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="service-price mb-3">$4.99 / analysis</div>
                        <p class="card-text">Screen for genetic variations associated with health conditions using medical-grade classifications.</p>
                        <ul class="list-unstyled mb-4">
                            <li><i class="fas fa-check text-success me-2"></i> Standard medical classification of variants</li>
                            <li><i class="fas fa-check text-success me-2"></i> Analysis of potential health associations</li>
                            <li><i class="fas fa-check text-success me-2"></i> Estimate of likelihood for expression</li>
                        </ul>
                        <button class="btn btn-primary w-100" data-bs-toggle="modal" data-service="Pathogenic Variant Package" onclick="openPaymentModal('pathogenic_variant')">
                            Select
                        </button>
                    </div>
                </div>
            </div>
            <!-- Espacio vacío para balance visual -->
            <div class="col-md-6 col-lg-4 mb-4">
                <!-- Intencionalmente vacío para mantener el balance -->
            </div>
        </div>
    `
}


async function openPaymentModal(selected_package) {
    const modalId = "paymentModal";
    $("#modalSectionContainer").html(stripeModalComponent(selected_package, modalId));
    $("#" + modalId).modal('show');
    await creatStripePurchaseIntent(selected_package)
}


async function updateJobStatus(userSignature) {
    try {
        const registration = await getRegisteredUser(userSignature);
        const job = registration?.register?.job_status;
        if (job !== undefined) {
            setLocalJobStatus(job);
        }
        return job;
    } catch (err) {
        console.error("Error actualizando job status:", err);
        throw err;
    }
}


// 2) Modificación en startAnalysisViewProcess → tick()
function startAnalysisViewProcess() {
    const localRegistration = getLocalRegistration();
    const filename = localRegistration?.register?.filename;
    $("#analysisViewContainer").html(
        startRunningViewComponent(filename, localRegistration?.register?.job_status?.status, localRegistration?.register?.job_status?.logs[0])
    );


    if (analysisViewIntervalId) {return};
    localStorage.setItem("analysisViewActive", "true");
    const tick = async () => {
        try {

            const job = await updateJobStatus(getUserToken());
            if (job === undefined) {
                return;
            }
            const localRegistration = getLocalRegistration();
            const filename = localRegistration?.register?.filename;
            const status = job.status;
            if (status === "Running") {
                $("#analysisViewContainer").html(
                    startRunningViewComponent(filename, status, job.logs[0])
                );
                return;
            }
            else if (status === "Completed") {
                $("#analysisViewContainer").html(
                    startFinishViewComponent(filename, status, job.logs[0], job.package, "success", false)
                );
                stopAnalysisViewProcess();
                const resultFiles = await getResultsFolder(getUserToken(), job.package);
                $("#resultsFolderContainer").html(resultsComponent(resultFiles))
            }
            else {
                $("#analysisViewContainer").html(
                    startFinishViewComponent(filename, status, job.logs[0], job.package, "danger", true)
                );
                stopAnalysisViewProcess();
            }

        } catch (err) {
            console.error("Error en tick:", err);
        }
    };
    tick();
    analysisViewIntervalId = setInterval(tick, 2000);
}

function stopAnalysisViewProcess() {
    if (analysisViewIntervalId) {
        clearInterval(analysisViewIntervalId);
        analysisViewIntervalId = null;
    }
    localStorage.removeItem("analysisViewActive");
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("analysisViewActive") === "true") {
        startAnalysisViewProcess();
    }
});

