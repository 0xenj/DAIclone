const { expect, assert } = require("chai");

const Helper = require("./shared");
const { ethers } = require("hardhat");

// describe("Dai", function () {
//   let dai;

//   before(async function () {
//     [provider, owner, user1, user2, user3] =
//       await Helper.setupProviderAndAccount();
//   });

//   beforeEach(async () => {
//     const daiFactory = await ethers.getContractFactory("Dai");
//     dai = await daiFactory.deploy(ethers.utils.parseUnits("1", 18));
//     const contractInstance = await dai.deployed();
//     return contractInstance;
//   });

//   it("should have a total supply of 1", async () => {
//     const totalSupply = await dai.totalSupply();
//     expect(totalSupply).to.equal(ethers.utils.parseUnits("1", 18));
//   });

//   it("should allow transfers", async () => {
//     const amount = ethers.utils.parseUnits("0.5", 18);

//     await dai.transfer(user1.address, amount);

//     const senderBalance = await dai.balanceOf(user2.address);
//     const receiverBalance = await dai.balanceOf(user1.address);

//     expect(senderBalance).to.equal(ethers.utils.parseUnits("0.5", 18));
//     expect(receiverBalance).to.equal(ethers.utils.parseUnits("0.5", 18));
//   });

//   it("should allow approvals", async () => {
//     const amount = ethers.utils.parseUnits("0.5", 18);

//     await dai.approve(user2.address, amount);

//     const allowance = await dai.allowance(owner.address, user2.address);
//     expect(allowance).to.equal(ethers.utils.parseUnits("0.5", 18));
//   });
// });

describe("Dai", function () {
  const initialBalance = ethers.utils.parseEther("500");

  beforeEach(async function () {
    [provider, owner, user1, user2, user3] =
      await Helper.setupProviderAndAccount();
    const Dai = await ethers.getContractFactory("Dai");
    dai = await Dai.deploy(initialBalance);
  });

  it("transfers DAI from one account to another", async function () {
    const transferAmount = ethers.utils.parseEther("100");
    await dai.transfer(user1.address, transferAmount);

    const ownerBalance = await dai.balanceOf(owner.address);
    const user1Balance = await dai.balanceOf(user1.address);
    expect(ownerBalance).to.equal(initialBalance.sub(transferAmount));
    expect(user1Balance).to.equal(transferAmount);
  });
});
