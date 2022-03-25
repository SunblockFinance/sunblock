// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT

import { BigNumber, ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'
import { ABI_VEHICLE } from '../../../contracts/abi/vehicle'
import {
  CONTRACT_ADDRESS_VEHICLE_STRONG,
  CONTRACT_ADDRESS_VEHICLE_YIELD
} from '../../../programs/polygon'

const provider = new ethers.providers.WebSocketProvider(
  `${process.env.RPC_ENDPOINT}`
)


const strongblock = new ethers.Contract(
  CONTRACT_ADDRESS_VEHICLE_STRONG,
  ABI_VEHICLE,
  provider
)
const yieldnode = new ethers.Contract(
  CONTRACT_ADDRESS_VEHICLE_YIELD,
  ABI_VEHICLE,
  provider
)

type Data = {
  field: string | string[]
  value: string | number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { q, addr } = req.query

  switch (q) {
    case 'vehicleInvestmentPool':
      await getVehicleInvestmentPool(addr).then((pool) => {
        res.status(200).json({ field: q, value: pool })
      })
      break
    case 'vehicleRewardPool':
        await getVehicleRewardPool(addr).then((pool) => {
        res.status(200).json({ field: q, value: pool })
        })
        break
    default:
      res.status(400).json({ field: 'error', value: 'Unknown search request' })
      break
  }
}

// ========== CONTRACT CALLS ============ //

/**
 * Well retrive the amount required to trigger funding of the vehicle
 * @returns formatted amount to be reach before funding the vehicle
 */
 async function getVehicleInvestmentPool(vehicleAddress:any): Promise<string> { //TODO: Fix ANY to String
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

  async function getVehicleRewardPool(vehicleAddress:any): Promise<string> {
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
