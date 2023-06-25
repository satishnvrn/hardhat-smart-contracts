import { ethers } from "hardhat";
import { assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types';

describe("SimpleStorage", () => {
  let simpleStorageFactory: SimpleStorage__factory, simpleStorage: SimpleStorage;
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("should store favourite number as 10", async () => {
    const storeTransactionResponse = await simpleStorage.store(10);
    await storeTransactionResponse.wait(1);
    const favouriteNumber = await simpleStorage.retrieve();
    assert.equal(favouriteNumber.toString(), '10');
  })
});