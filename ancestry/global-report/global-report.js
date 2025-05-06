$(async()=>{
    requireAuth()
    $("#navbar-container").html(navBar())
    
    // const ancestry = {"ancestry": {"AFR_NORTE": "0.067303", "AFR_ESTE": "0.000010", "MIXTECA": "0.032698", "HUICHOL": "0.031567", "MEDIO_ORIENTE": "0.064763", "JUDIO": "0.125290", "ASIA_SURESTE": "0.000010", "TARAHUMARA": "0.019167", "NAHUA_OTOMI": "0.216372", "EUR_ESTE": "0.095392", "TRIQUI": "0.015397", "EUR_NORESTE": "0.017270", "AMAZONAS": "0.010932", "OCEANIA": "0.000010", "EUR_SUROESTE": "0.255656", "EUR_OESTE": "0.000010", "ANDES": "0.011933", "EUR_NORTE": "0.000010", "AFR_OESTE": "0.000010", "ASIA_SUR": "0.000010", "PIMA": "0.012179", "MAYA": "0.000010", "ASIA_ESTE": "0.000010", "ZAPOTECA": "0.023991"}}
    const ancestry = await getResults(getUserToken())
    const formattedAncestry = roundAncestryValues(ancestry.data)

    $("#banner-container").html(global_ancestry_banner(formattedAncestry))
    $("#global-ancestry-container").html(global_ancestry_card(formattedAncestry))

    
    $("#footer-container").html(footer())


})