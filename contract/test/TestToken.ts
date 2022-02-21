import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { TestToken } from "../types/TestToken";

describe("Test Token", function () {
  let accounts: SignerWithAddress[];
  let contract: TestToken;
  beforeEach(async () => {
    accounts = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory("TestToken");
    contract = (await contractFactory.deploy()) as TestToken;
    await contract.deployed();
    contract = contract.connect(accounts[0]);
  });

  describe("default", () => {
    it("owner should have initial supply", async () => {
      expect(await contract.balanceOf(accounts[0].address)).to.eq(100000);
    });
  });
});
