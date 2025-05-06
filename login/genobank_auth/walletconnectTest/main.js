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
const { configureChains, createConfig, signMessage, getAccount } = WagmiCore;

const chains = [mainnet, polygon, avalanche, arbitrum];
const projectId = "2faedae5e25139c05cb092e6c098a44c";

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, version: 2, projectId }),
  publicClient: configureChains(chains, [w3mProvider({ projectId })]).publicClient,
});

const web3Modal = new Web3Modal(
  { projectId, walletImages: { safe: "https://genobank.io/images/GenoBank.io_logo@2x.svg" }},
  new EthereumClient(wagmiConfig, chains)
);

const connectAndSign = async () => {
  await web3Modal.openModal();

  while (getAccount().isConnecting) {
    console.log('Esperando a que la conexión se complete...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const account = getAccount();
  if (!account.connector) return console.error('No se pudo obtener el conector.');

  try {
    const signature = await signMessage({ message: "I want to proceed" });
    console.log('Mensaje firmado:', signature);

    // Guardar en localStorage
    localStorage.setItem("user_wallet", account.address);
    localStorage.setItem("user_sign", signature);
    localStorage.setItem("login_method", "wallet connect");

  } catch (error) {
    console.error('Error al firmar el mensaje:', error);
  }
};

document.querySelector('w3m-core-button').addEventListener('click', connectAndSign);
