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
                            <h5>Rare Coding Package</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="service-price mb-3">$4.99 / use</div>
                        <p class="card-text">Identify rare genetic variants associated with diseases and conditions.</p>
                        <ul class="list-unstyled mb-4">
                            <li><i class="fas fa-check text-success me-2"></i> Rare variant identification</li>
                            <li><i class="fas fa-check text-success me-2"></i> Clinical significance assessment</li>
                            <li><i class="fas fa-check text-success me-2"></i> Detailed reporting</li>
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
                            <h5>Hereditary Cancer</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="service-price mb-3">$4.99 / use</div>
                        <p class="card-text">Analyze genetic predispositions to various hereditary cancers.</p>
                        <ul class="list-unstyled mb-4">
                            <li><i class="fas fa-check text-success me-2"></i> Cancer gene analysis</li>
                            <li><i class="fas fa-check text-success me-2"></i> Risk assessment</li>
                            <li><i class="fas fa-check text-success me-2"></i> Counseling recommendations</li>
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
                            <h5>Splicing Package</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="service-price mb-3">$4.99 / use</div>
                        <p class="card-text">Detailed analysis of RNA splicing variants and their potential impact.</p>
                        <ul class="list-unstyled mb-4">
                            <li><i class="fas fa-check text-success me-2"></i> Splicing site analysis</li>
                            <li><i class="fas fa-check text-success me-2"></i> Functional prediction</li>
                            <li><i class="fas fa-check text-success me-2"></i> Transcript mapping</li>
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
                            <h5>Drug Interaction Package</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="service-price mb-3">$4.99 / use</div>
                        <p class="card-text">Analyze genetic factors affecting drug metabolism and potential interactions.</p>
                        <ul class="list-unstyled mb-4">
                            <li><i class="fas fa-check text-success me-2"></i> Pharmacogenomic analysis</li>
                            <li><i class="fas fa-check text-success me-2"></i> Medication response prediction</li>
                            <li><i class="fas fa-check text-success me-2"></i> Adverse reaction risk assessment</li>
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
                            <h5>Pathogenic Variant Package</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="service-price mb-3">$4.99 / use</div>
                        <p class="card-text">Comprehensive identification and classification of pathogenic genetic variants.</p>
                        <ul class="list-unstyled mb-4">
                            <li><i class="fas fa-check text-success me-2"></i> ACMG classification</li>
                            <li><i class="fas fa-check text-success me-2"></i> Disease association analysis</li>
                            <li><i class="fas fa-check text-success me-2"></i> Penetrance estimation</li>
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

