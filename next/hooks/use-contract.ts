import Web3 from "web3";
import { useWeb3js } from "../providers/web3-provider";

const useContract = () => {
  const { contract, web3 } = useWeb3js();

  const openPackage = ({ account, pkCode }: { account: string; pkCode: number }) => {
    const data = {
      from: account,
      value: Web3.utils.toWei((0).toString(), "ether"),
    };
    return contract.methods.openPackage(pkCode).send(data);
  };

  const adminMintNFTs = ({ account, _quantity }: { account: string; _quantity: number }) => {
    const data = {
      from: account,
      value: Web3.utils.toWei((0).toString(), "ether"),
    };
    return contract.methods.adminMintNFTs(_quantity).send(data);
  };

  const buyPrivatePackage = ({
    account,
    amount,
    pkCode,
  }: {
    account: string;
    amount: number;
    pkCode: number;
  }) => {
    const data = {
      from: account,
      value: Web3.utils.toWei(amount.toString(), "ether"),
    };
    // console.log("amount", amount);
    // console.log("data", data);
    // console.log("pkCode", pkCode);
    return contract.methods.buyPrivatePackage(pkCode).send(data);
  };

  const buyPublicPackage = ({
    account,
    amount,
    pkCode,
  }: {
    account: string;
    amount: number;
    pkCode: number;
  }) => {
    const data = {
      from: account,
      value: Web3.utils.toWei(amount.toString(), "ether"),
    };
    // console.log("data", data);
    // console.log("pkCode", pkCode);
    return contract.methods.buyPublicPackage(pkCode).send(data);
  };

  const purchaseNft = ({
    account,
    amount,
    tokenId,
  }: {
    account: string;
    amount: number;
    tokenId: number;
  }) => {
    // console.log("amount", amount);
    const data = {
      from: account,
      value: Web3.utils.toWei(amount.toString(), "ether"),
    };
    console.log("data", data);
    return contract.methods.purchaseNft(tokenId).send(data);
  };

  const listNft = ({
    account,
    tokenId,
    price,
  }: {
    account: string;
    price: number;
    tokenId: number;
  }) => {
    const data = {
      from: account,
      value: Web3.utils.toWei((0).toString(), "ether"),
    };
    // console.log("data", data);
    // console.log("pkCode", pkCode);
    const priceEth = Web3.utils.toWei(price.toString(), "ether");
    // console.log("priceEth", priceEth);
    return contract.methods.listNft(tokenId, priceEth).send(data);
  };

  const setApproval = ({
    hostAddress,
    address,
    approved,
  }: {
    hostAddress: string;
    address: string;
    approved: boolean;
  }) => {
    const data = {
      from: hostAddress,
      value: Web3.utils.toWei((0).toString(), "ether"),
    };
    console.log("data", data);
    // console.log("pkCode", pkCode);
    return contract.methods.setApprovalForAll(address, approved).send(data);
  };

  const setPrivateSale = ({ hostAddress, allowed }: { hostAddress: string; allowed: boolean }) => {
    const data = {
      from: hostAddress,
      value: Web3.utils.toWei((0).toString(), "ether"),
    };
    const privateSale = 0;
    // console.log("data", data);
    // console.log("pkCode", pkCode);
    return contract.methods.allowRule(privateSale, allowed).send(data);
  };

  const setAllowSale = ({ hostAddress, allowed }: { hostAddress: string; allowed: boolean }) => {
    const data = {
      from: hostAddress,
      value: Web3.utils.toWei((0).toString(), "ether"),
    };
    const allowSale = 1;
    // console.log("data", data);
    // console.log("pkCode", pkCode);
    return contract.methods.allowRule(allowSale, allowed).send(data);
  };

  const setAllowOpenPkg = ({ hostAddress, allowed }: { hostAddress: string; allowed: boolean }) => {
    const data = {
      from: hostAddress,
      value: Web3.utils.toWei((0).toString(), "ether"),
    };
    const allowOpenPkg = 2;
    // console.log("data", data);
    // console.log("pkCode", pkCode);
    return contract.methods.allowRule(allowOpenPkg, allowed).send(data);
  };

  const getRevertReason = async (txHash) => {
    console.log("getRevertReason txHash", txHash);
    const tx = await web3.eth.getTransaction(txHash);

    console.log("tx", tx);
    await web3.eth.call(tx, tx.blockNumber);
  };

  const getMetamaskError = (error) => {
    let message = "";
    if (error.message.includes("[ethjs-query]")) {
      const msg = error.message
        .replace("[ethjs-query] while formatting outputs from RPC ", "")
        .replaceAll("'", "");
      const parseMsg = JSON.parse(msg);
      console.log("parseMsg", parseMsg.value.data.message);
      message = parseMsg.value.data.message;
    } else {
      message = error.message;
    }
    return message;
  };

  const getBalance = (account) => {
    return web3.eth.getBalance(account, function (error, result) {
      if (error) {
        console.log(account + ": " + error);
      }
    });
  };

  return {
    openPackage,
    buyPrivatePackage,
    buyPublicPackage,
    listNft,
    purchaseNft,
    getRevertReason,
    getMetamaskError,
    getBalance,
    adminMintNFTs,
    setApproval,
    setPrivateSale,
    setAllowSale,
    setAllowOpenPkg,
  };
};

export default useContract;
