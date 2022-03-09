// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
const { expect } = require('chai')
const { ethers, upgrades } = require('hardhat')

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

describe('InvestmentVehicle.initialize', function () {
  it('Should have creator as manager role', async () => {
    expect(await vehicleContract.hasRole(MANAGER_ROLE, owner.address)).to.equal(
      true
    )
  })

  it('Should have creator as upgrader role', async () => {
    expect(await vehicleContract.hasRole(UPGRADER_ROLE, owner.address)).to.equal(
      true
    )
  })

  it('Should have creator as pauser role', async () => {
    expect(await vehicleContract.hasRole(PAUSER_ROLE, owner.address)).to.equal(
      true
    )
  })

  it('Should have 100 as management fee', async () => {
    expect(await vehicleContract.managementFee()).to.equal(
      100
    )
  })

  it(`Should have paymentInstrument set to USDT` , async () => {
    expect(await vehicleContract.paymentInstrument()).to.equal(
        usdtContract.address
    )
  })
})



// let tx: ContractTransaction = await myToken.connect(accounts[0]).transfer(accounts[1].address, 1);

// let receipt: ContractReceipt = await tx.wait();
// console.log(receipt.events?.filter((x) => {return x.event == "Transfer"}));
