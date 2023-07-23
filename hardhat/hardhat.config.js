require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const GOERLISCAN_API_KEY = process.env.GOERLISCAN_API_KEY;

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmation: 1,
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    "mantle-testnet": {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: [PRIVATE_KEY], // Uses the private key from the .env file
    },
    hyperspace: {
      chainId: 3141,
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      // polygonMumbai: POLYGONSCAN_API_KEY,
      goerli: GOERLISCAN_API_KEY,
    },
  },
};

// hyperspace = https://api.hyperspace.node.glif.io/rpc/v1
