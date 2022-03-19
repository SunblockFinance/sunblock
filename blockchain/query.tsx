// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { BigNumber, ethers } from 'ethers'
import {
  ABI_SUNBLOCK_CUBE
} from '../contracts/abi/sunblock'
import { ABI_ERC20 } from '../programs/contracts'
import {
  CONTRACT_ADDRESS_CUBE, TOKEN_ADDRESS_USDC
} from '../programs/polygon'
import { formatUSDCWeiToNumber } from '../utils/formaters'


export async function getCurrentTargetAmount(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const signer = provider.getSigner()
  if (signer === undefined) return 0

  const cube = new ethers.Contract(CONTRACT_ADDRESS_CUBE, ABI_SUNBLOCK_CUBE, provider)

  const targetAmount = await cube.currentTargetAmount()
  return formatUSDCWeiToNumber(targetAmount)
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function getNextTargetAmount(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const signer = provider.getSigner()
  if (signer === undefined) return 0

  const cube = new ethers.Contract(CONTRACT_ADDRESS_CUBE, ABI_SUNBLOCK_CUBE, provider)

  const targetAmount = await cube.nextTargetAmount()
  return formatUSDCWeiToNumber(targetAmount)
  } catch (error) {
    console.log(error);
    return 0
  }
}


export async function getUSDCBalance(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const signer = provider.getSigner()
  if (signer === undefined) return 0
  const signerAddress = await signer.getAddress()
  const erc20 = new ethers.Contract(TOKEN_ADDRESS_USDC, ABI_ERC20, signer)

  const contractBalance = await erc20.balanceOf(signerAddress)
  return formatUSDCWeiToNumber(contractBalance)
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function getStrongBalance(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const signer = provider.getSigner()
  if (signer === undefined) return 0
  const signerAddress = await signer.getAddress()
  const erc20 = new ethers.Contract(TOKEN_ADDRESS_USDC, ABI_ERC20, signer)

  const contractBalance = await erc20.balanceOf(signerAddress)
  return formatUSDCWeiToNumber(contractBalance)
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function getHeldShares(provider: ethers.providers.Web3Provider): Promise<number> {
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
    console.log(error);
    return 0
  }
}

export async function getSharesIssued(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )
    const amount: BigNumber = await contract.sharesIssued()
    return amount.toNumber()
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function getInvestmentFund(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )
    const amount: BigNumber = await contract.investmentHeld()
    return formatUSDCWeiToNumber(amount)
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function getRewardFund(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )
    const amount: BigNumber = await contract.rewardsHeld()
    return formatUSDCWeiToNumber(amount)
  } catch (error) {
    console.log(error);
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

export async function getShareholderCount(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      provider
    )
    const amount: BigNumber = await contract.shareHolderCount()
    return amount.toNumber()
  } catch (error) {
    console.log(error);
    return 0
  }
}
