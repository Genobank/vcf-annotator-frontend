// Definir si estamos en entorno local
const local = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const inTestFolder = window.location.pathname.includes('/test/');
window.environment = inTestFolder ? '/test' : '';

window.VCF_APP_API = local ? 
    "http://localhost:8081/api_vcf_annotator" : 
    (inTestFolder ? "https://staging.genobank.app/api_vcf_annotator" : "https://genobank.app/api_vcf_annotator");

window.GENOBANK_APP_API = local ? 
    "http://localhost:8081" : 
    (inTestFolder ? "https://staging.genobank.app" : "https://genobank.app");

// Stripe solo tenemos configurado:local gratis (api key de test) pero staging como produccion usan tarjetas reales
window.STRIPE_API_KEY = local ? 
    "pk_test_51PAz5oP0dxUGJnMrio3qPNeTY3eKfENpc0bm5kwPLVWGN4jLsEcFPMFiDHo1Fo0aYwQPYO6KPfJ6ul0PreuZTuI000bkb2mqYB" : 
    "pk_live_0xUehyxeOMpKjNo80GLhTs3o";

window.MAGIC_API_KEY = "pk_live_5F9630468805C3A0";
window.RPC_NETWORK = "https://api.avax-test.network/ext/bc/C/rpc";
window.CHAIN_ID = 43113;

window.IP_EXPLORER = "https://explorer.story.foundation"