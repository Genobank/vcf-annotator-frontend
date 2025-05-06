

function requireAuth(require = true) {
    const isRequired = (require !== false && require !== 0 && require !== "No");
    // localStorage.setItem("AUTH", value.toString());
    if (isRequired) {
        if (!isLoggedIn()) {
            window.location.href = window.location.origin + "/login"
        }
    }

}

async function requireUploadedFile() {
    if (isLoggedIn()) {
        try{
            const registration = await getRegisteredUser(getUserToken())
            const isRegistered = !isEmpty(registration.register)
            if (!isRegistered) {
                window.location.href = window.location.origin + "/login"
            }
            localStorage.setItem('registration', JSON.stringify(registration));
            return registration
        }catch(error){
            logout()
            window.location.reload()
            console.log(error)
        }
    }
}