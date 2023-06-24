import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';
import "@nomicfoundation/hardhat-verify";
import "./tasks/block-number";

const SEPOLIA_RPC_URL: string = process.env.SEPOLIA_RPC_URL || '';
const PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
const ETHERSCAN_API_KEY: string = process.env.ETHERSCAN_API_KEY || '';

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      accounts: ['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
      chainId: 31337
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY
    }
  }
};

export default config;
