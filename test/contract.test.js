const { expect } = require("chai");
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
  beforeEach(async function () {
    [provider, owner, user1, user2, user3] =
      await Helper.setupProviderAndAccount();
    contract = await Helper.setupContractTest1();
  });

  it("should return the name of the token", async () => {
    const name = await contract.name();
    expect(name).to.equal("Dai Stablecoin");
  });

  it("should return the symbol of the token", async () => {
    const symbol = await contract.symbol();
    expect(symbol).to.equal("DAI");
  });

  it("should return the decimals of the token", async () => {
    const decimals = await contract.decimals();
    expect(decimals).to.equal(18);
  });

  it("should return the total supply of the token", async () => {
    const totalSupply = await contract.totalSupply();
    expect(ethers.utils.formatEther(totalSupply.toString())).to.equal("0.0");
  });

  it("should return the balance of an address", async () => {
    const balance = await contract.balanceOf(user1.address);
    expect(ethers.utils.formatEther(balance.toString())).to.equal("0.0");
  });

  it("should return the allowance of an address", async () => {
    const allowance = await contract.allowance(user1.address, user2.address);
    expect(ethers.utils.formatEther(allowance.toString())).to.equal("0.0");
  });

  // it("transfers DAI from one account to another", async function () {
  //   const transferAmount = ethers.utils.parseEther("100");
  //   await contract.transfer(user1.address, transferAmount);

  //   const ownerBalance = await contract.balanceOf(owner.address);
  //   const user1Balance = await contract.balanceOf(user1.address);
  //   expect(ownerBalance).to.equal(initialBalance.sub(transferAmount));
  //   expect(user1Balance).to.equal(transferAmount);
  // });
});
