import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { EnvKeys } from "../lib/helpers/env.helper";
import { CustomerWalletType, walletObjects } from "../lib/modules/wallet/wallet.model";
import { logoutUser } from "../redux/actions/user.action";
import { useDispatch } from "../redux/store";
import artifact from "../contracts/DC8NFT.sol/DC8NFT.json";
import useEnv from "../hooks/use-env";
import { ChainNetworks, networks } from "../lib/helpers/network.helper";
import mainnetContract from "../contracts/DC8NFT.sol/DC8NFT.json";
import testnetContract from "../contracts/TestnetDC8NFT.sol/TestnetDC8NFT.json";

const Web3Context = createContext<
  Partial<{
    metaInstalled: boolean;
    currentAccount: string;
    currenWalletType: CustomerWalletType;
    connectMetamask: any;
    signNonce: any;
    changeNetwork: any;
    web3: any;
    balance: number;
    contract: any;
    checkWalletInstalled: any;
    checkNetwork: any;
  }>
>({});

const Web3Provider = (props: any) => {
  const [error, setError] = useState<string>();
  const dispatch = useDispatch();


  const env = useEnv(EnvKeys.nodeENV);
  const address = useEnv(EnvKeys.smAddressMarketplace);
  const abi: any = env === "development" ? testnetContract.abi : mainnetContract.abi;

  const nonceCode = useEnv(EnvKeys.nonceCode);

  const [web3, setWeb3] = useState<Web3>();
  const [metaInstalled, checkMetaInstalled] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [currenWalletType, setCurrentWalletType] = useState(CustomerWalletType.METAMASK);
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState<any>();
  const walletAddress: string = useEnv(EnvKeys.walletAddress);

  useEffect(() => {
    if (window) {
      loadMetamaskWallet(window[walletObjects.ethereum]);
    }
  }, [typeof window]);

  const loadMetamaskWallet = (wallet) => {
    // //console.log("wallet", wallet);
    const Window = window as any;
    if (!wallet) {
      return;
    }
    if (wallet.isMetaMask === false) {
      return;
    }

    if (wallet.isMetaMask === true && Window?.CoinbaseWalletProvider) {
      return;
    }

    if (
      wallet.isMetaMask === true &&
      Window?.CoinbaseWalletProvider &&
      wallet?.isBitKeepChrome === true
    ) {
      return;
    }

    if (wallet.isMetaMask === true && wallet?.isBitKeepChrome === true) {
      return;
    }

    // //console.log("wallet", wallet);

    const web3 = new Web3(wallet);
    setWeb3(web3);

    //console.log("Metamask is installed");
    checkMetaInstalled(true);

    wallet.on("chainChanged", (networkId) => {});

    wallet.on("accountsChanged", (accounts) => {
      logoutUser()(dispatch);
    });
  };

  const loadContractMetamask = () => {
    setError(null);
    const winEth: any = window[walletObjects.ethereum];
    const web3 = new Web3(winEth);
    const contract = new web3.eth.Contract(abi, address);
    setContract(contract);
  };

  const connectMetamask = (toast) => {
    // //console.log("window", window);
    const Window = window as any;
    const wallet: any = Window[walletObjects.ethereum];
    //console.log("connectMetamask", wallet);
    //console.log("networkVersion", wallet.networkVersion);
    //console.log("networkId", wallet.chainId);

    if (!wallet.isMetaMask) {
      toast.error("Please install Metamask");
      return;
    }

    if (Window?.CoinbaseWalletProvider) {
      toast.error("Please disable Coinbase");
      return;
    }

    if (wallet?.isBitKeepChrome) {
      toast.error("Please disable Bitkeep");
      return;
    }
    // window.CoinbaseWalletProvider
    // window.ethereum.isMetaMask
    wallet
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        console.log("connected Metamask", accounts);
        if (accounts?.length > 0) {
          const address: string = accounts[0].toString();
          console.log("walletAddress", walletAddress);
          console.log("address", address);

          if (walletAddress.toLowerCase() !== address.toLowerCase()) {
            toast.error("Your wallet not correct");
            return;
          }
          setCurrentAccount(address);
          setCurrentWalletType(CustomerWalletType.METAMASK);
          loadContractMetamask();
          //console.log("web3.eth", web3.eth);
          web3.eth.getBalance(address, function (err, balance) {
            //console.log("balance", balance);
            const amount = parseFloat(balance) / 10 ** 18;
            //console.log("read", read);
            setBalance(amount);
          });
        }
      })
      .catch((error) => {
        //console.log("error", error);
      });
  };
  const signNonce = ({ publicAddress, nonce }: { publicAddress: string; nonce: string }) => {
    return web3.eth.personal.sign(
      `${nonceCode} ${nonce}`,
      publicAddress,
      "" // MetaMask will ignore the password argument here
    );
  };

  const changeNetwork = ({ networkName }: { networkName: ChainNetworks }) => {
    const wallet: any = window[walletObjects?.ethereum];
    return (
      wallet &&
      wallet.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      })
    );
  };

  const checkWalletInstalled = (type: CustomerWalletType) => {
    let installed = null;
    const Window: any = window;
    switch (type) {
      case CustomerWalletType.METAMASK:
        if (Window?.ethereum?.isMetaMask === true) {
          installed = true;
        }
        break;
      case CustomerWalletType.PLUG_WALLET:
        if (Window.ic) {
          installed = true;
        }
        break;
      case CustomerWalletType.BINANCE_CHAIN:
        if (Window?.BinanceChain) {
          installed = true;
        }
        break;
    }
    return installed;
  };

  const checkNetwork = ({ networkName }: { networkName: ChainNetworks }) => {
    const wallet: any = window[walletObjects.ethereum];
    return wallet?.chainId === networks[networkName].chainId;
  };

  return (
    <Web3Context.Provider
      value={{
        metaInstalled,
        currentAccount,
        currenWalletType,
        connectMetamask,
        signNonce,
        changeNetwork,
        web3,
        balance,
        contract,
        checkWalletInstalled,
        checkNetwork,
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;

export const useWeb3js = () => useContext(Web3Context);
