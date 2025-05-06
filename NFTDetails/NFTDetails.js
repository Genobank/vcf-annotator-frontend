
$(async()=>{
    $("#navbar-container").html(navBar())

    const nftDetails = getLocalRegistration()
    $("#nft-card-container").html(nftCardComponent(nftDetails.register.nft_info))

    $("#footer-container").html(footer())

})