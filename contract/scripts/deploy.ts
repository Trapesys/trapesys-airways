import { ethers } from "hardhat";
import { MVPToken, MVPFlightTicket, MVPTicketSale } from "../types";

const INITIAL_TOKEN_SUPPLY = ethers.BigNumber.from(10).pow(6);

async function main() {
  const [deployer] = await ethers.getSigners();

  const deployerBalance = (await deployer.getBalance()).toString();
  console.log(
    `Deploying contracts by the account: ${deployer.address} (balance: ${deployerBalance})`
  );

  // TokenContract
  const tokenContractFactory = await ethers.getContractFactory("MVPToken");
  const tokenContract = (await tokenContractFactory.deploy(
    deployer.address,
    INITIAL_TOKEN_SUPPLY
  )) as MVPToken;
  await tokenContract.deployed();

  // TicketContract
  const ticketContractFactory = await ethers.getContractFactory(
    "MVPFlightTicket"
  );
  const ticketContract = (await ticketContractFactory.deploy(
    deployer.address
  )) as MVPFlightTicket;
  await ticketContract.deployed();

  await Promise.all([tokenContract.deployed(), ticketContract.deployed()]);
  console.log(`MVPToken: ${tokenContract.address}`);
  console.log(`MVPFlightTicket: ${ticketContract.address}`);

  // TicketSale
  const ticketSaleContractFactory = await ethers.getContractFactory(
    "MVPTicketSale"
  );
  const ticketSaleContract = (await ticketSaleContractFactory.deploy(
    deployer.address,
    tokenContract.address,
    ticketContract.address
  )) as MVPTicketSale;
  await ticketSaleContract.deployed();
  console.log(`MVPTicketSale: ${ticketSaleContract.address}`);

  // Grant role
  const tx = await ticketContract.grantRole(
    await ticketContract.MINTER_ROLE(),
    ticketSaleContract.address
  );
  await tx.wait();
  console.log(
    "Granted MVPTicketSale permission to mint new ticket in MVPFlightTicket contract"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
