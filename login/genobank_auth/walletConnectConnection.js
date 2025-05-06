window.process = { env: { NODE_ENV: 'production' } };

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
} from "https://unpkg.com/@web3modal/ethereum@2.7.1";
import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.7.1";
import { Buffer } from 'https://cdn.skypack.dev/buffer';

window.Buffer = window.Buffer || Buffer;

const { mainnet, polygon, avalanche, arbitrum } = WagmiCoreChains;
const { configureChains, createConfig, signMessage, getAccount, disconnect } = WagmiCore;

const chains = [mainnet, polygon, avalanche, arbitrum];
const projectId = "2faedae5e25139c05cb092e6c098a44c";

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, version: 2, projectId }),
  publicClient: configureChains(chains, [w3mProvider({ projectId })]).publicClient,
});

const options = {
  projectId,
  privacyPolicyUrl: 'https://genobank.io/privacy-policy',
  themeMode: 'light',
  walletImages: { safe: "https://genobank.io/images/GenoBank.io_logo@2x.svg" }
}

const web3Modal = new Web3Modal(
  options,
  new EthereumClient(wagmiConfig, chains)
);

// Función para suscribirse al evento de desconexión
const subscribeToDisconnect = (account) => {
  console.log("subscribeToDisconnect", account)
  if (account.connector) {

    console.log("Subscribiendo")

    
    account.connector.on('disconnect', () => {
      onDisconnectWallet();
    });
  }
};



const connectAndSign = async () => {
  document.getElementById("walletConectLoginSpiner").style.display = "block";

  await web3Modal.openModal();

  // Escuchar el evento de cierre del modal
  web3Modal.subscribeModal(({ open }) => {
    if (!open) {
      console.log("modal cerrado");
      document.getElementById("walletConectLoginSpiner").style.display = "none";

    }
  });


  while (getAccount().isConnecting) {
    console.log('Waiting to complete connection...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const account = getAccount();
  if (!account.connector) return console.error('Cant get the connector.');

  subscribeToDisconnect(account); // Suscribir al evento de desconexión

  try {
    const signature = await signMessage({ message: "I want to proceed" });
    console.log('Mensaje firmado:', signature);

    // Guardar en localStorage
    localStorage.setItem("user_wallet", account.address);
    localStorage.setItem("user_sign", signature);
    localStorage.setItem("login_method", "walletConnect");
    document.getElementById("walletConectLoginSpiner").style.display = "none";

    closingPopup()

  } catch (error) {

    console.error('Error al firmar el mensaje:', error);
  }
};

const disconnectWallet = async () => {
  try {
    await disconnect();

    console.log('Wallet desconectada.');

    // Limpiar el localStorage
    localStorage.removeItem("user_wallet");
    localStorage.removeItem("user_sign");
    localStorage.removeItem("login_method");

    location.reload()

    // Aquí puedes agregar lógica adicional si es necesario
  } catch (error) {
    console.error('Error al desconectar la wallet:', error);
  }
};

function onDisconnectWallet() {
  console.log('Wallet desconectada.');

  // localStorage.removeItem("user_wallet");
  // localStorage.removeItem("user_sign");
  // localStorage.removeItem("login_method");
  localStorage.clear()

  location.reload();
}

async function walletConnectSignMessage (message) {
// export const walletConnectSignMessage = async (message) => {
  const account = getAccount();

  // Verifica si ya hay una conexión activa
  if (!account.isConnected) {
    await web3Modal.openModal();

    // Esperar a que se complete la conexión
    while (getAccount().isConnecting) {
      console.log('Waiting to complete connection...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Firma el mensaje
  try {
    const signature = await signMessage({ message });
    console.log('Mensaje firmado:', signature);
    return signature;
  } catch (error) {
    console.error('Error al firmar el mensaje:', error);
    throw error;
  }
};


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




  while (getAccount().isReconnecting) {
    console.log('Waiting to complete connection...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Verificar si hay una conexión existente al cargar la página
const account = getAccount();
if (account.isConnected) {
  console.log('Wallet ya está conectada.');
  subscribeToDisconnect(account);
}

window.disconnectWallet = disconnectWallet;
window.connectAndSign = connectAndSign;
window.walletConnectSignMessage = walletConnectSignMessage;

// document.querySelector('w3m-core-button').addEventListener('click', connectAndSign);
