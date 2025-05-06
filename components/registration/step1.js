function step1Component(){

    return /* html */`
    <div class="card">
        <div class="card-body">
            <div class="text-center card-body">
                <div class="alert alert-success valid-hashcode-message" style="display: None;" role="alert">
                    <h4 class="alert-heading"><i class="fa-solid fa-circle-check text-success"></i> Valid Hash Code</h4>
                    <p class="message-valid-hash-code">You are using a valid hash code</p>
                </div>
                <p class="h5">Sign with existing metamask wallet or create a new one</p>
                <img class="img-kit" src="img/RAW_DATA.png"><br>
                <button type="button" class="somos-btn login-btn" onclick="handleLogin()" id="login-btn">Sign In with: 
                    <img class="genobank-btn-logo" src="../images/GenoBank.io_white_logo_and_name.svg">
                </button>
            </div>
        </div>
    </div>
    <script>

    $(async function(){
        if (hashCode != null){
           const isValidHashCode = await postIsValidHashCode(hashCode)
           console.log("validation hash code after load compoponent", isValidHashCode)
           if (isValidHashCode?.valid){
            $(".valid-hashcode-message").show()
           }
        }
    })

    </script>
    `
}


async function handleLogin(){
    $("#login-btn").attr("disabled", "disabled")
    $("#login-btn").html(/*html */`
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>    
    `)

    const GAuth = new GenoBankLoginAuth();
    const genobankCredentials = await GAuth.loginWithPopup();
    if (GAuth.isLoggedIn()){
        // nextStep()
        window.location.reload();
    }

    $("#login-btn").html(/*html */`
        <img class="genobank-btn-logo" src="../images/GenoBank.io_white_logo_and_name.svg">
    `)
    $("#login-btn").attr("disabled", false)
}