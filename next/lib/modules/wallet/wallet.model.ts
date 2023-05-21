export enum walletObjects {
  BinanceChain = "BinanceChain", // bsc
  ethereum = "ethereum", //metamask
  coin98 = "coin98",
  BitKeepJS = "BitTerra",
}

export enum CustomerWalletType {
  METAMASK = "METAMASK",
  C98 = "C98",
  MATH = "MATH",
  BINANCE_CHAIN = "BINANCE_CHAIN",
  BITKEEP = "BITKEEP",
  WALLETCONNECT = "WALLETCONNECT",
  COINBASE = "COINBASE",
  PLUG_WALLET = "PLUG_WALLET",
}

export const customerWalletTypeData = [
  {
    name: "Metamask",
    code: CustomerWalletType.METAMASK,
    icon: "/images/wallet/metamask.svg",
    downloadUrl:
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=chrome-ntp-icon",
  },
  // {
  //   name: "Plug wallet",
  //   code: CustomerWalletType.PLUG_WALLET,
  //   icon: "/images/wallet/plug.png",
  //   downloadUrl:
  //     "https://chrome.google.com/webstore/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm?utm_source=chrome-ntp-icon",
  // },
  // {
  //   name: "Binance Chain Wallet",
  //   code: CustomerWalletType.BINANCE_CHAIN,
  //   icon: "/images/wallet/binance-chain.svg",
  //   downloadUrl:
  //     "https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp?utm_source=chrome-ntp-icon",
  // },
  // {
  //   name: "Bitkeep",
  //   code: CustomerWalletType.BITKEEP,
  //   icon: "/images/wallet/bitkeep.png",
  //   downloadUrl:
  //     "https://chrome.google.com/webstore/detail/bitkeep-bitcoin-crypto-wa/jiidiaalihmmhddjgbnbgdfflelocpak",
  // },
  // {
  //   name: "WalletConnect",
  //   code: CustomerWalletType.WALLETCONNECT,
  //   icon: "/images/wallet/wallet-connect.svg",
  //   downloadUrl:
  //     "https://chrome.google.com/webstore/detail/bitkeep-bitcoin-crypto-wa/jiidiaalihmmhddjgbnbgdfflelocpak",
  // },
  // {
  //   name: "Coinbase",
  //   code: CustomerWalletType.COINBASE,
  //   icon: "/images/wallet/coinbase.png",
  //   downloadUrl:
  //     "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?brand=CHBD&brand=FKPE&gclid=CjwKCAjw0a-SBhBkEiwApljU0hX4upjYx0ux-IawIu7DbtqNiKtMP0Qaa3gHlJnpmNCAqTgvLIjYmhoC3psQAvD_BwE&gclsrc=aw.ds",
  // },
  //   {
  //     name: "Coin98",
  //     code: CustomerWalletType.C98,
  //     icon: "/images/wallet/c98.png",
  //     downloadUrl:
  //       "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg?utm_source=chrome-ntp-icon",
  //   },
  //   {
  //     name: "MathWallet",
  //     code: CustomerWalletType.MATH,
  //     icon: "/images/wallet/math.svg",
  //     downloadUrl:
  //       "https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc?utm_source=chrome-ntp-icon",
  //   },
];

export enum BinanceNetworks {
  TESTNET = "bbc-testnet",
  MAINNET = "bbc-mainnet",
}
