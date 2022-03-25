// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
// ========== CONTRACT CALLS ============ //

import { BigNumber, ethers } from "ethers"
import { ABI_VEHICLE } from "../contracts/abi/vehicle"

const provider = new ethers.providers.WebSocketProvider(
    `wss://ws-matic-mainnet.chainstacklabs.com`
  )

/**
 * Well retrive the amount required to trigger funding of the vehicle
 * @returns formatted amount to be reach before funding the vehicle
 */
 export async function getVehicleInvestmentPool(vehicleAddress:any): Promise<string> { //TODO: Fix ANY to String
    try {
      const vehicle = new ethers.Contract(
        vehicleAddress,
        ABI_VEHICLE,
        provider
      )
      const amount:BigNumber = await vehicle.investmentPool()
      return ethers.utils.formatUnits(amount, 6)
    } catch (error) {
      console.log(error)
      return ''
    }
  }

  export async function getVehicleRewardPool(vehicleAddress:any): Promise<string> {
    try {
      const vehicle = new ethers.Contract(
        vehicleAddress,
        ABI_VEHICLE,
        provider
      )
      const amount:BigNumber = await vehicle.rewardPool()
      return ethers.utils.formatUnits(amount, 6)
    } catch (error) {
      console.log(error)
      return ''
    }
  }