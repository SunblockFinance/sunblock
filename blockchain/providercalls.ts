// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
// ========== CONTRACT CALLS ============ //

import { BigNumber, ethers } from "ethers"
import { ABI_SUNBLOCK_CUBE } from "../contracts/abi/sunblock"
import { ABI_VEHICLE } from "../contracts/abi/vehicle"
import { CONTRACT_ADDRESS_CUBE } from "../programs/polygon"
import { formatUSDTWeiToNumber } from "../utils/formaters"

const provider = new ethers.providers.WebSocketProvider(`wss://polygon-mainnet.g.alchemy.com/v2/uP5bkRrcXRoo906ITYJpQhHzjKLBrJ-l`)
const cube = new ethers.Contract(CONTRACT_ADDRESS_CUBE, ABI_SUNBLOCK_CUBE,provider)

/**
 * Well retrive the amount required to trigger funding of the vehicle
 * @returns formatted amount to be reach before funding the vehicle
 */
 export async function getCurrentTargetAmount(): Promise<number> {
    try {
      const targetAmount = await cube.currentTargetAmount()
      return formatUSDTWeiToNumber(targetAmount)
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  /**
   * Will retrieive the name of the current vehicle waiting to be funded
   * @returns name of vehicle as stated in the contract
   */
   export async function getCurrentTargetName(): Promise<string> {
    try {
      const vehicleAddress = await cube.currentVehicle()
      const vehicle = new ethers.Contract(
        vehicleAddress,
        ABI_VEHICLE,
        provider
      )
      const name = await vehicle.vehicleName()
      return ethers.utils.parseBytes32String(name)
    } catch (error) {
      console.log(error)
      return ''
    }
  }

  /**
   * Well retrive the amount required to trigger funding of the vehicle
   * @returns formatted amount to be reach before funding the vehicle
   */
   export async function getNextTargetAmount(): Promise<number> {
    try {
      const targetAmount = await cube.nextTargetAmount()
      return formatUSDTWeiToNumber(targetAmount)
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  /**
   * Will retrieive the name of the next vehicle waiting to be funded
   * @returns name of vehicle as stated in the contract
   */
   export async function getNextTargetName(): Promise<string> {
    try {
      const vehicleAddress = await cube.nextVehicle()
      const vehicle = new ethers.Contract(
        vehicleAddress,
        ABI_VEHICLE,
        provider
      )
      const name = await vehicle.vehicleName()
      return ethers.utils.parseBytes32String(name)
    } catch (error) {
      console.log(error)
      return ''
    }
  }

  /**
   * Fetches the amount stored in the cube investment fund. These
   * are funds that is yet to be distributed to a vehicle
   * @returns amount of funds int the investment fund
   */
  export async function getCubeInvestmentFund(): Promise<number> {
  try {
    const amount: BigNumber = await cube.investmentHeld()
    return formatUSDTWeiToNumber(amount)
  } catch (error) {
    console.log(error)
    return 0
  }
}

  /**
   * Get the amount of rewards, in the set currency, stored and waiting for distribution.
   * @returns amount of rewards waiting for distribution. Returned formatted
   */
   export async function getCubeRewardFund(): Promise<number> {
      try {
        const amount: BigNumber = await cube.rewardsHeld()
        return formatUSDTWeiToNumber(amount)
      } catch (error) {
        console.log(error)
        return 0
      }


  }

  /**
   * Will retreive the amount of shares held by a specific address
   * @returns count of shares held by this address
   */
   export async function getHeldShares(address:string | string[]): Promise<number> {
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS_CUBE,
        ABI_SUNBLOCK_CUBE,
        provider
      )

      const amount: BigNumber = await contract.shareholder(address)
      return amount.toNumber()
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  /**
   *
   * @returns Total amount of shares issued by this cube
   */
   export async function getSharesIssued(): Promise<number> {
    try {
      const amount: BigNumber = await cube.sharesIssued()
      return amount.toNumber()
    } catch (error) {
      console.log(error)
      return 0
    }
  }


  export async function getSharePrice(): Promise<number> {
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS_CUBE,
        ABI_SUNBLOCK_CUBE,
        provider
      )
      const cost: BigNumber = await contract.unitcost()
      return formatUSDTWeiToNumber(cost)
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  export async function getShareholderCount(): Promise<number> {
    try {
      const amount: BigNumber = await cube.shareHolderCount()
      return amount.toNumber()
    } catch (error) {
      console.log(error)
      return 0
    }
  }