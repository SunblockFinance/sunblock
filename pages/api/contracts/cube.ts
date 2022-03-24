// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from '@sentry/nextjs'
import { BigNumber, ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ABI_SUNBLOCK_CUBE } from '../../../contracts/abi/sunblock'
import { ABI_VEHICLE } from '../../../contracts/abi/vehicle'
import { CONTRACT_ADDRESS_CUBE } from '../../../programs/polygon'
import { formatUSDTWeiToNumber } from '../../../utils/formaters'

const provider = new ethers.providers.WebSocketProvider(`${process.env.RPC_ENDPOINT}`)

// === CONTRACTS === //
const cube = new ethers.Contract(CONTRACT_ADDRESS_CUBE, ABI_SUNBLOCK_CUBE,provider)


type Data = {
  field: string | string[]
  value: string | number
}

// =========== HANDLER ============ //

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { q, addr } = req.query
  switch (q) {
    case 'currentTargetAmount':
      await getCurrentTargetAmount().then((targetAmount) => {
        res.status(200).json({ field: q, value:targetAmount })
      })
      break;
    case 'currentTargetName':
      await getCurrentTargetName().then((targetName) => {
        res.status(200).json({ field:q, value:targetName })
      })
      break;
      case 'nextTargetAmount':
      await getNextTargetAmount().then((targetAmount) => {
        res.status(200).json({ field: q, value:targetAmount })
      })
      break;
    case 'nextTargetName':
      await getNextTargetName().then((targetName) => {
        res.status(200).json({ field:q, value:targetName })
      })
      break;
    case 'cubeInvestmentFund':
      await getCubeInvestmentFund().then((amount) => {
        res.status(200).json({ field:q, value:amount })
      })
      break;
    case 'cubeRewardFund':
      await getCubeRewardFund().then((amount) => {
        res.status(200).json({ field:q, value:amount })
      })
      break;
    case 'heldShares':
      await getHeldShares(addr).then((amount) => {
        res.status(200).json({ field:q, value:amount })
      })
      break;
    case 'sharesIssued':
      await getSharesIssued().then((amount) => {
        res.status(200).json({ field:q, value:amount})
      })
      break;
    case 'sharePrice':
      await getSharePrice().then((price) => {
        res.status(200).json({ field:q, value:price })
      })
      break;
    case 'shareholderCount':
      await getShareholderCount().then((count) => {
        res.status(200).json({ field:q, value:count })
      })
      break;
    default:
      res.status(400).json({ field: 'error', value: 'Unknown search request' })
      break;
  }
}

// ========== CONTRACT CALLS ============ //

/**
 * Well retrive the amount required to trigger funding of the vehicle
 * @returns formatted amount to be reach before funding the vehicle
 */
async function getCurrentTargetAmount(): Promise<number> {
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
async function getCurrentTargetName(): Promise<string> {
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
 async function getNextTargetAmount(): Promise<number> {
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
async function getNextTargetName(): Promise<string> {
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
async function getCubeInvestmentFund(): Promise<number> {
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
async function getCubeRewardFund(): Promise<number> {
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
async function getHeldShares(address:string | string[]): Promise<number> {
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
async function getSharesIssued(): Promise<number> {
  try {
    const amount: BigNumber = await cube.sharesIssued()
    return amount.toNumber()
  } catch (error) {
    console.log(error)
    return 0
  }
}


async function getSharePrice(): Promise<number> {
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

async function getShareholderCount(): Promise<number> {
  try {
    const amount: BigNumber = await cube.shareHolderCount()
    return amount.toNumber()
  } catch (error) {
    console.log(error)
    return 0
  }
}
export default withSentry(handler);