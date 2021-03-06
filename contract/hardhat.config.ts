import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "tsconfig-paths/register";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";

require("dotenv").config();

const privateKeys = (process.env.PRIVATE_KEYS ?? "").split(",");

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    edge: {
      url: process.env.JSONRPC_URL ?? "http://localhost:10002",
      timeout: 10000000,
      accounts: [...privateKeys],
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false,
    externalArtifacts: ["externalArtifacts/*.json"],
  },
};

export default config;
