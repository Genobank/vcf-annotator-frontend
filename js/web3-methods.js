const customNodeOptions = {
    rpcUrl: window.RPC_NETWORK,
    chainId: window.CHAIN_ID 
  }

function magicConstructor(){
	return new Magic(window.MAGIC_API_KEY, {
		extensions: [new MagicOAuthExtension()],
		network: customNodeOptions,
	});
}




async function signAndVerify (message){
	let account = localStorage.getItem('user_wallet')
	const magic = new Magic(window.MAGIC_API_KEY, {
		network: window.NETWORK_NAME,
	});
	console.log("magic constructor",magic)
	const web3 = new Web3(magic.rpcProvider);
	console.log("sign and verify mensaje: ", message)
	const signedMessage = await web3.eth.personal.sign(
		message,
		account,
		""
	);
	return signedMessage
}


async function signPersonalMessage(message) {
	const loginMethod = getLoginMethod();
	console.log("loggin method", loginMethod)
	if (loginMethod === 'metamask') {
		let provider = new ethers.providers.Web3Provider(window.ethereum);
		await window.ethereum.request({ method: 'eth_requestAccounts' });
		let sign_autentication = await provider.getSigner().signMessage(message);
		return sign_autentication;
	} else if (loginMethod === 'magic') {
		// let messageHex = ethers.utils.hexlify(message);
		let sign_autentication = await signAndVerify(message)
		return sign_autentication;
	} else if(loginMethod === 'walletConnect'){
		let sign_autentication = await walletConnectSignMessage(message);
		return sign_autentication
	}
	else {
		throw new Error('Not logged in or login method is unknown')
	}
}