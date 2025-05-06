
if (!isLoggedIn()) {
    window.location.href = '/login/';
}

$(async()=>{
    $("#navbar-container").html(navBar())
    const localRegistration = getLocalRegistration()
    if (!localRegistration){
        window.location.href = '/login/';
    }
    $("#main-dashboard-container").html(mainDashboardComponent(localRegistration?.register))
    // $("#footer-container").html(footer())
})