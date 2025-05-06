

const GENOBANK_SERVER = "http://localhost:8081"
const MESSAGE_TO_SIGN = "I want to proceed"
const RPC_NETWORK = "https://api.avax-test.network/ext/bc/C/rpc"
const CHAIN_ID = 43113
const MAGIC_API_KEY = "pk_live_5F9630468805C3A0"
const NETWORK_NAME = "Avalanche"
const metamaskLoader = $("#metamaskLoginSpiner")
const googleLoader = $("#googleLoginSpiner")

async function loginUsingMetamask() {
	console.log("Metamask login")
	metamaskLoader.show()
	if (typeof window.ethereum === 'undefined') {
		showErrorToast("MetaMask is not detected. Please install MetaMask and try again.");
		metamaskLoader.hide();
		return;
	}
	try {
		await startingMetamaskLoginProcess()
		// closingPopup()
		window.close()
	} catch (e) {
		console.log(e.code + ":" + e.message)
		showErrorToast(e.code + " : " + e.message)
		console.error(e)
		return e
	} finally {
		metamaskLoader.hide()
	}
}

async function startingMetamaskLoginProcess(){
	let provider = new ethers.providers.Web3Provider(window.ethereum);
	await window.ethereum.request({ method: 'eth_requestAccounts' });
	let sign_autentication = await provider.getSigner().signMessage(MESSAGE_TO_SIGN);
	localStorage.setItem('user_sign', sign_autentication);
	let wallet = await provider.getSigner().getAddress()
	localStorage.setItem('user_wallet', wallet);
	let isPerm = await getValidatePermittee(wallet)
	localStorage.setItem('isPermittee', !!isPerm);

	localStorage.setItem('login_method', 'metamask');
}


function magicConstructor() {
    return new Magic(MAGIC_API_KEY, {
        extensions: [new MagicOAuthExtension()],
        network: {
            rpcUrl: RPC_NETWORK,
            chainId: CHAIN_ID
        }
    });
}


function getCurrentDomainWithPort() {
	const location = window.location;
	let domain = location.hostname;
	if (location.port && location.port !== "80" && location.port !== "443") {
		domain += ':' + location.port;
	}
	return domain;
}

async function loginUsingOAuthClient() {
	googleLoader.show()
	let magic = magicConstructor();
	await magic.oauth.loginWithRedirect({
		provider: 'google',
		redirectURI: `${window.location.protocol}//${getCurrentDomainWithPort()}/login/genobank_auth/oauth-callback.html`
	});
}

async function handleOAuthResult() {
	try {
		let magic = magicConstructor();
		const result = await magic.oauth.getRedirectResult();
		console.log("OAuth result:", result);
		localStorage.setItem('magic_token', result?.magic?.idToken);
		localStorage.setItem('user_wallet', result?.magic?.userMetadata?.publicAddress);
		let isPerm = await getValidatePermittee(result?.magic?.userMetadata?.publicAddress)
		localStorage.setItem('isPermittee', !!isPerm);
		localStorage.setItem('email', result?.oauth?.userInfo?.email);
		localStorage.setItem('name', result?.oauth?.userInfo?.name);
		localStorage.setItem('picture', result?.oauth?.userInfo?.picture);
		localStorage.setItem('login_method', 'magic');
		console.log("signing message...")
		const signature_of_this_user = await signAndVerify(MESSAGE_TO_SIGN)
		console.log("signature_of_this_user:", signature_of_this_user)
		localStorage.setItem('user_sign', signature_of_this_user)
		window.close();
		// closingPopup()
	} catch (error) {
		console.error(error)
		// return error
	}
}


async function loginUsingEmail(inputEmail) {
	try {
		const magic = magicConstructor();
		const result = await magic.auth.loginWithMagicLink({ email: inputEmail });
		const userInfo = await magic.user.getInfo();
		let isPerm = await getValidatePermittee(result?.magic?.userMetadata?.publicAddress)
		localStorage.setItem('isPermittee', !!isPerm);
		localStorage.setItem('magic_token', result)
		localStorage.setItem('user_wallet', userInfo.publicAddress);
		localStorage.setItem('email', userInfo.email);
		localStorage.setItem('login_method', 'magic');
		const signature_of_this_user = await signAndVerify(MESSAGE_TO_SIGN)
		localStorage.setItem('user_sign', signature_of_this_user)
		closingPopup()
	}
	catch (err) {
		console.error(err)
	}
}

async function loginUsingEmailHandler() {
	$("#emailLoginSpiner").show()
	try {
		const userEmail = $("#emailInput").val();
		await loginUsingEmail(userEmail);
		console.log("userEmail", userEmail)
	}catch (error) {
		console.error("Error in loginUsingEmailHandler:", error);
		showErrorToast("Error: " + error.message);
	}finally {
		$("#emailLoginSpiner").hide()
	}

}


function validateEmailInput(){
	const emailInput = document.getElementById('emailInput').value;
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (emailPattern.test(emailInput)) {
		$("#emailLoginButton").prop("disabled", false);
	} else {
		$("#emailLoginButton").prop("disabled", true);
	}
}




function showErrorToast(message) {
	$('.toast .toast-body').text(message);
	let toastEl = $('.toast');
	let toast = new bootstrap.Toast(toastEl);
	toast.show();
}


// async function signAndVerify (message){
// 	try{
// 		let account = localStorage.getItem('user_wallet')
// 		const magic = new Magic(MAGIC_API_KEY, {
// 			network: NETWORK_NAME,
// 		});
// 		console.log("magic constructor",magic)
// 		const web3 = new Web3(magic.rpcProvider);
// 		console.log("sign and verify mensaje: ", message)
// 		const signedMessage = await web3.eth.personal.sign(
// 			message,
// 			account,
// 			""
// 		);
// 		console.log("signedMessage ", signedMessage)

// 		return signedMessage
// 	}catch(error){
// 		console.error("error", error)
// 	}
// }



async function signAndVerify(message) {
    try {
        let account = localStorage.getItem('user_wallet');
        if (!account) {
            throw new Error("No account found in localStorage.");
        }
        const magic = magicConstructor();
        console.log("magic constructor", magic);
        const web3 = new Web3(magic.rpcProvider);
        const isLoggedIn = await magic.user.isLoggedIn();
        if (!isLoggedIn) {
            throw new Error("User is not logged in with Magic.");
        }
        console.log("Signing message:", message);
        const signedMessage = await web3.eth.personal.sign(
            message,
            account, // Dirección del usuario obtenida de localStorage
            "" // Aquí puede ir una contraseña si fuera necesario
        );
        console.log("Signed message:", signedMessage);
        return signedMessage;
    } catch (error) {
        console.error("Error signing the message:", error);
        showErrorToast("Error signing the message: " + error.message);
    }
}





function getProvider() {
	const loginMethod = getLoginMethod();
	if (loginMethod === 'metamask') {
		return new ethers.providers.Web3Provider(window.ethereum);
	} else if (loginMethod === 'magic') {
		const magic = magicConstructor()
		return magic.rpcProvider
	} else {
		throw new Error('Provider not set')
	}
}










async function getValidatePermittee(address) {
	const url = new URL(`${GENOBANK_SERVER}/validate_permittee`)
	url.searchParams.append('permittee', address);
	return fetch(url, {
		method: 'GET',
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		},
	}).then((res) => {
		return res.json();
	}).catch((e) => {
		return { errors: [{ message: e }] };
	});
}


// complement 


function closingPopup() {
    const loginData = {
        user_sign: localStorage.getItem('user_sign'),
        magic_token: localStorage.getItem('magic_token'),
        user_wallet: localStorage.getItem('user_wallet'),
        login_method: localStorage.getItem('login_method'),
        isPermittee: localStorage.getItem('isPermittee'),
        email: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        picture: localStorage.getItem('picture')
    };

	
    if (window.opener) {
		window.opener.postMessage({ type: 'loginData', loginData }, window.location.origin);
    }
}


function isCurrentUserPermittee() {
	const permitteeValue = localStorage.getItem('isPermittee');
	return permitteeValue === "true";
}

function isMetaMaskMobileBrowser() {
	const userAgent = (navigator.userAgent || '').toLowerCase();
	return userAgent.includes('metamaskmobile');
  }




// Exportar funciones globalmente
window.loginUsingMetamask = loginUsingMetamask;
window.loginUsingOAuthClient = loginUsingOAuthClient;
window.handleOAuthResult = handleOAuthResult;
window.showErrorToast = showErrorToast;
window.signAndVerify = signAndVerify;
window.getProvider = getProvider;
window.getValidatePermittee = getValidatePermittee;
window.closingPopup = closingPopup;
window.isCurrentUserPermittee = isCurrentUserPermittee;
window.isMetaMaskMobileBrowser = isMetaMaskMobileBrowser;
window.startingMetamaskLoginProcess = startingMetamaskLoginProcess;

