const { expect } = require("chai");
const Helper = require("./shared");
const { ethers } = require("hardhat");

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

  it("should mint tokens, transfer and burn", async () => {
    const amount = ethers.utils.parseEther("100");
    await contract.connect(user1).mint(user1.address, amount);

    const totalSupply = await contract.totalSupply();
    expect(ethers.utils.formatEther(totalSupply.toString())).to.equal("100.0");

    const balance = await contract.balanceOf(user1.address);
    expect(ethers.utils.formatEther(balance.toString())).to.equal("100.0");

    await contract.transfer(user2.address, ethers.utils.parseEther("50"));
    const balanceUser1 = await contract.balanceOf(user1.address);
    const balanceUser2 = await contract.balanceOf(user2.address);
    expect(ethers.utils.formatEther(balanceUser1.toString())).to.equal("50.0");
    expect(ethers.utils.formatEther(balanceUser2.toString())).to.equal("50.0");

    await contract.burn(user1.address, ethers.utils.parseEther("50"));
    const balanceUs1 = await contract.balanceOf(user1.address);
    const balanceUs2 = await contract.balanceOf(user2.address);
    expect(ethers.utils.formatEther(balanceUs1.toString())).to.equal("0.0");
    expect(ethers.utils.formatEther(balanceUs2.toString())).to.equal("50.0");

    const totalSupply_finale = await contract.totalSupply();
    expect(ethers.utils.formatEther(totalSupply_finale.toString())).to.equal(
      "50.0"
    );
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
