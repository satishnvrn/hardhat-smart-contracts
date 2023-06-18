import { ethers } from 'hardhat';

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');

  console.log('Deploying Simple Storage...');
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  const deployedAddress = await simpleStorage.getAddress();
  console.log('Deployed simple storage to', deployedAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
