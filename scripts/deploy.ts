import { ethers, run, network } from 'hardhat';

async function verify(contractAddress: string, args: any) {
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error: any) {
    if(error.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(error);
    }
  }
}

async function interact(contract: any) {
  const transactionResponse = await contract.store(10);
  await transactionResponse.wait(1);
  const updatedValue = await contract.retrieve();
  console.log('updatedValue', updatedValue);
}

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');

  console.log('Deploying Simple Storage...');
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  const deployedAddress = await simpleStorage.getAddress();
  const transactionResponse = await simpleStorage.deploymentTransaction();
  console.log('Deployed simple storage to', deployedAddress);
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY && transactionResponse) {
    console.log('waiting for txes');
    await transactionResponse.wait(20);
    console.log('20 transactions approved!')
    await verify(deployedAddress, []);
  }

  await interact(simpleStorage);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
