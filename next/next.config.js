const dotenv = require("dotenv");
dotenv.config();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  publicRuntimeConfig: {
    publicUri: process.env.PUBLIC_URI,
    tinymceApiKey: process.env.TINYMCE_API_KEY,
    recaptcha: process.env.RECAPTCHA,
    nodeENV: process.env.NODE_ENV,
    nonceCode: process.env.NONCE_CODE,
    imgbb: process.env.IMGBB_KEY,
    uploadUri: process.env.UPLOAD_URI,

    smAddressMarketplace:
      process.env.NODE_ENV === "development"
        ? process.env.TESTNET_SM_ADDRESS_MARKETPLACE
        : process.env.MAINNET_SM_ADDRESS_MARKETPLACE,

    blockchainScanUrl:
      process.env.NODE_ENV === "development"
        ? process.env.TESTNET_BLOCKCHAIN_SCAN_URL
        : process.env.MAINNET_BLOCKCHAIN_SCAN_URL,

    walletAddress:
      process.env.NODE_ENV === "development"
        ? process.env.TESTNET_WALLET_ADDRESS
        : process.env.MAINNET_WALLET_ADDRESS,
  },
});
