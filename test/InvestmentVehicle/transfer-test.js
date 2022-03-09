// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
const { expect } = require('chai')
const { ethers, upgrades } = require('hardhat')
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

let vehicleContract
let usdtContract
let owner
let addr1
let addr2
let addrs
let MANAGER_ROLE
let UPGRADER_ROLE
let PAUSER_ROLE


beforeEach(async function () {
  ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()

  MANAGER_ROLE = ethers.utils.id('MANAGER_ROLE')
  UPGRADER_ROLE = ethers.utils.id('UPGRADER_ROLE')
  PAUSER_ROLE = ethers.utils.id('PAUSER_ROLE')

  const USDT = await ethers.getContractFactory('Tether')
  usdtContract = await USDT.deploy()
  await usdtContract.deployed()

  // Get the ContractFactory and Signers here.
  const Vehicle = await ethers.getContractFactory('InvestmentVehicle')
  vehicleContract = await upgrades.deployProxy(
    Vehicle,
    [usdtContract.address, 100],
    { initializer: 'initialize', kind: 'uups' }
  )
  await vehicleContract.deployed()
})

describe('InvestmentVehicle.depositInvestment tests', function () {
  it('Should update balance on deposit', async () => {
    await usdtContract.approve(vehicleContract.address, 2000)
    expect(await usdtContract.allowance(owner.address, vehicleContract.address)).to.equal(2000);
    await expect(() => vehicleContract.depositInvestment(owner.address, 100)).to.changeTokenBalance(usdtContract, vehicleContract, 100)
  })

  it('Should emit InvestmentDeposited event on deposit', async () => {
    await usdtContract.approve(vehicleContract.address, 2000)
    expect(await usdtContract.allowance(owner.address, vehicleContract.address)).to.equal(2000);
    await expect(vehicleContract.depositInvestment(owner.address, 100)).to.emit(vehicleContract, 'InvestmentDeposited').withArgs(owner.address, owner.address, 100)
  })

  it('Should update investment pool on deposit', async () => {
    await usdtContract.approve(vehicleContract.address, 2000)
    expect(await usdtContract.allowance(owner.address, vehicleContract.address)).to.equal(2000);
    await vehicleContract.depositInvestment(owner.address, 100)
    expect(await vehicleContract.investmentPool()).to.equal(100)
  })

  it('Should append investment pool on deposit', async () => {
    await usdtContract.approve(vehicleContract.address, 2000)
    expect(await usdtContract.allowance(owner.address, vehicleContract.address)).to.equal(2000);
    await vehicleContract.depositInvestment(owner.address, 100)
    expect(await vehicleContract.investmentPool()).to.equal(100)
    await vehicleContract.depositInvestment(owner.address, 100)
    expect(await vehicleContract.investmentPool()).to.equal(200)
  })
})

describe('InvestmentVehicle.withdrawInvestment tests', () => {
  it('Should update balance on withdrawal', async () => {
    await usdtContract.approve(vehicleContract.address, 2000)
    expect(await usdtContract.allowance(owner.address, vehicleContract.address)).to.equal(2000);
    await expect(() => vehicleContract.depositInvestment(owner.address, 200)).to.changeTokenBalance(usdtContract, vehicleContract, 200)
    await expect(() => vehicleContract.withdrawInvestment(owner.address, 50)).to.changeTokenBalance(usdtContract, vehicleContract, -50)
  })
  it('Should not reduce investment pool when withdrawing on low balance', async () => {
    await usdtContract.approve(vehicleContract.address, 2000)
    expect(await usdtContract.allowance(owner.address, vehicleContract.address)).to.equal(2000);
    await expect(() => vehicleContract.depositInvestment(owner.address, 200)).to.changeTokenBalance(usdtContract, vehicleContract, 200)
    await expect(vehicleContract.withdrawInvestment(owner.address, 350)).to.be.revertedWith('ERC20: transfer amount exceeds balance')
    expect(await vehicleContract.investmentPool()).to.be.equal(200)
  })
  it('Should emit InvestmentWithdrawn event on withdrawal', async () => {
    await usdtContract.approve(vehicleContract.address, 2000)
    expect(await usdtContract.allowance(owner.address, vehicleContract.address)).to.equal(2000);
    await expect(() => vehicleContract.depositInvestment(owner.address, 200)).to.changeTokenBalance(usdtContract, vehicleContract, 200)
    await expect(vehicleContract.withdrawInvestment(owner.address, 150)).to.emit(vehicleContract, 'InvestmentWithdrawn').withArgs(owner.address, owner.address, 150)
  })
  it('Should update the investment Pool on withdrawal', async () => {
    await usdtContract.approve(vehicleContract.address, 2000)
    expect(await usdtContract.allowance(owner.address, vehicleContract.address)).to.equal(2000);
    await expect(() => vehicleContract.depositInvestment(owner.address, 200)).to.changeTokenBalance(usdtContract, vehicleContract, 200)
    expect(vehicleContract.withdrawInvestment(owner.address, 150))
    expect(await vehicleContract.investmentPool()).to.be.equal(50)
  })
})
