function navBar() {
    const userWallet = getUserWallet()
    const registration = getLocalRegistration()
    const tokenLinkExplorer = `/NFTDetails/`
    return /* html*/`
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div class="container-fluid">
            <a class="navbar-brand" href="#" onclick="gotoHome()">
                <img class="mt-4 ms-3 mb-4" src="/images/GenoBank.io_logo@2x.svg" alt="SOMOS" height="42">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav me-auto">
                

                </div>
                <div class="navbar-nav ms-auto">
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div class="display-6 fs-3 text-end">
                                BioWallet
                            </div>
                            ${userWallet}

                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item display-6 fs-6" href="#" onclick="userLogout()">Log out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel"><img class="mt-4 ms-3 mb-4" src="/images/SOMOS-LOGO-AZUL.png" alt="SOMOS" height="25"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="${tokenLinkExplorer}">
                        <img src="/images/insignia-logo.png"  style="width: 1.5rem;">
                        BioDataset Token
                    </a>
                </li>
                <li class="nav-item dropdown">
                
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="display-6 fs-5 text-start">
                            BioWallet
                        </div>
                        ${userWallet}
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <hr class="dropdown-divider">
                        </li>

                        <li><a class="dropdown-item" href="#" onclick="userLogout()">Log out</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    `;
}

function gotoHome() {
    if (window.location.pathname !== '/') {
        window.location.href = '/';
    }
}

async function userLogout() {
    // Implementa la lógica de cierre de sesión aquí
    await disconnectWallet();
    localStorage.clear();
    location.reload();
}
