// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { BigNumber, ethers } from 'ethers'
import { ABI_ERC20 } from '../contracts/abi/erc20'
import { ABI_SUNBLOCK_CUBE } from '../contracts/abi/sunblock'
import { ABI_VEHICLE } from '../contracts/abi/vehicle'
import { CONTRACT_ADDRESS_CUBE, TOKEN_ADDRESS_USDT } from '../programs/polygon'
import { formatUSDTWeiToNumber as formatUSDTWeiToNumber } from '../utils/formaters'

export async function getCurrentTargetAmount(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  try {
    const signer = provider.getSigner()
    if (signer === undefined) return 0

    const cube = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )

    const targetAmount = await cube.currentTargetAmount()
    return formatUSDTWeiToNumber(targetAmount)
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getCurrentTargetName(
  provider: ethers.providers.Web3Provider
): Promise<any> {
  try {
    const signer = provider.getSigner()
    if (signer === undefined) return 0

    const cube = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )

    const vehicleAddress = await cube.currentVehicle()
    const vehicle = new ethers.Contract(
      vehicleAddress,
      ABI_VEHICLE,
      provider
    )
    const name = await vehicle.vehicleName()
    console.log("NAME:", name);

    return ethers.utils.parseBytes32String(name)
  } catch (error) {
    console.log(error)
    return ''
  }
}

export async function getNextTargetName(
  provider: ethers.providers.Web3Provider
): Promise<any> {
  try {
    const signer = provider.getSigner()
    if (signer === undefined) return 0

    const cube = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )

    const vehicleAddress = await cube.nextVehicle()
    const vehicle = new ethers.Contract(
      vehicleAddress,
      ABI_VEHICLE,
      provider
    )
    const name = await vehicle.vehicleName()
    console.log("NAME:", name);

    return ethers.utils.parseBytes32String(name)
  } catch (error) {
    console.log(error)
    return ''
  }
}

export async function getNextTargetAmount(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  try {
    const signer = provider.getSigner()
    if (signer === undefined) return 0

    const cube = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )

    const targetAmount = await cube.nextTargetAmount()
    return formatUSDTWeiToNumber(targetAmount)
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getUSDTBalance(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  try {
    const signer = provider.getSigner()
    if (signer === undefined) return 0
    const signerAddress = await signer.getAddress()
    const erc20 = new ethers.Contract(TOKEN_ADDRESS_USDT, ABI_ERC20, signer)

    const contractBalance = await erc20.balanceOf(signerAddress)
    return formatUSDTWeiToNumber(contractBalance)
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getStrongBalance(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  try {
    const signer = provider.getSigner()
    if (signer === undefined) return 0
    const signerAddress = await signer.getAddress()
    const erc20 = new ethers.Contract(TOKEN_ADDRESS_USDT, ABI_ERC20, signer)

    const contractBalance = await erc20.balanceOf(signerAddress)
    return formatUSDTWeiToNumber(contractBalance)
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getHeldShares(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )
    const signAddr = await provider.getSigner().getAddress()
    const amount: BigNumber = await contract.shareholder(signAddr)
    return amount.toNumber()
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getSharesIssued(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )
    const amount: BigNumber = await contract.sharesIssued()
    return amount.toNumber()
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getInvestmentFund(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )
    const amount: BigNumber = await contract.investmentHeld()
    return formatUSDTWeiToNumber(amount)
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getRewardFund(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )
    const amount: BigNumber = await contract.rewardsHeld()
    return formatUSDTWeiToNumber(amount)
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getSharePrice(
  provider: ethers.providers.Web3Provider
): Promise<BigNumber> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )
    const cost: BigNumber = await contract.unitcost()
    return cost
  } catch (error) {
    console.log(error)
    return BigNumber.from(0)
  }
}

export async function getShareholderCount(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )
    const amount: BigNumber = await contract.shareHolderCount()
    return amount.toNumber()
  } catch (error) {
    console.log(error)
    return 0
  }
}
