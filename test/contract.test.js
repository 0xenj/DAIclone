const { expect } = require("chai");

const Helper = require("./shared");
const { ethers } = require("hardhat");

describe("Dai", function () {
  let dai;

  before(async function () {
    [provider, owner, user1, user2, user3] =
      await Helper.setupProviderAndAccount();
  });

  beforeEach(async () => {
    const daiFactory = await ethers.getContractFactory("Dai");
    dai = await daiFactory.deploy(ethers.utils.parseUnits("1", 18));
  });

  it("should set the correct values", async () => {
    const name = await dai.name();
    const symbol = await dai.symbol();
    const version = await dai.version();
    const decimals = await dai.decimals();

    assert.equal(name, "Dai Stablecoin");
    assert.equal(symbol, "DAI");
    assert.equal(version, "1");
    assert.equal(decimals.toNumber(), 18);
  });
});
