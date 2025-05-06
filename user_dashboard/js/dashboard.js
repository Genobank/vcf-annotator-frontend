let userRegistration

$(async()=>{
    requireAuth()
    userRegistration = await requireUploadedFile()
    $("#navbar-container").html(navBar())
    $("#services_container").html(service_card_list([
        service_card("SOMOS ANCESTRY", "Discover your ancestry by requesting this service", "images/services/somos/banner.png", "redirectToPage('/ancestry')" ),
        service_card("SOMOS Health", "Comming soon", "images/services/somos/banner.png", "showCommingSoon('SOMOS EHALT')",true),
        service_card("SOMOS Nutrigenomics", "Comming soon", "images/services/somos/banner.png", "showCommingSoon('SOMOS NUTRIGENOMICS')",true),
        service_card("SOMOS Pharmacogenomics", "Comming soon", "images/services/somos/banner.png", "showCommingSoon('SOMOS Pharmacogenomics')", true),
    ]))
    $("#footer-container").html(footer())
})


function showCommingSoon(content){
    console.log(content)
}

