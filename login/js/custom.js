if (isLoggedIn()) {
    $(async () => {
        await gotoDashboardIfRegistered()
    })
}



async function gotoDashboardIfRegistered(){
    const registration = await getRegisteredUser(getUserToken())
    const isRegistered = !isEmpty(registration.register)
    // disable redirecto to dashboard if registered+
    if (isRegistered) {
        setLocalRegistration(registration)
        window.location.href = window.location.origin
    } else {
        window.location.href = "/register"
        throw new Error("You still do not have files uploaded specifically for ancestry processing, please register by uploading your file for free");
    }
}

async function prepareLogin() {
    try {
        $("#login-btn").html(/*html */`
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>    
        `)
        const GAuth = new GenoBankLoginAuth();
        if (isMetaMaskMobileBrowser()){
		    await startingMetamaskLoginProcess()
        }else{
            const genobankCredentials = await GAuth.loginWithPopup();
            console.log("genobankCredentials: ", genobankCredentials);
        }
        if (GAuth.isLoggedIn) {
            await gotoDashboardIfRegistered()
        }
    } catch (e) {
    }
    finally {
        $("#login-btn").html(/*html */`
            <img class="genobank-btn-logo" src="../images/GenoBank.io_white_logo_and_name.svg">
        `)
    }

}

function gotoStore() {
    window.location.href = "https://genobank.io/shop/details/?id=1"
}

function gotoRegister() {
    window.location.href = "/register"
}