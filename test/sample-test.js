// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("USDT tests", function () {
  it("Should return 6 decimals", async function () {
    const USDT = await ethers.getContractFactory("Tether");
    const usdt = await USDT.deploy();
    await usdt.deployed();
    expect(await usdt.decimals()).to.equal(6);
  });
  it("Should send USDT to addr1", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const USDT = await ethers.getContractFactory("Tether");
    const usdt = await USDT.deploy();
    await usdt.deployed();

    const decimals = await usdt.decimals();
    await usdt.connect(owner).transfer(addr1.address, 1)
    expect(decimals).to.equal(6);
    expect(await usdt.balanceOf(addr1.address)).to.equal(1)
  });
});
