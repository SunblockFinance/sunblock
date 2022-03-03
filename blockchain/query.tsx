// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { BigNumber, ethers } from 'ethers'
import {
  ABI_ERC20,
  ABI_SUNBLOCK,
  InvestmentVehicle
} from '../programs/contracts'
import {
  CONTRACT_ADDRESS_SUNBLOCK,
  INVESTMENT_WALLET,
  REWARD_WALLET,
  TOKEN_ADDRESS_DEMOERC20
} from '../programs/polygon'
import { formatWeiToNumber } from '../utils/formaters'

export async function getStrongBalance(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const signer = provider.getSigner()
  if (signer === undefined) return 0
  const signerAddress = await signer.getAddress()
  const erc20 = new ethers.Contract(TOKEN_ADDRESS_DEMOERC20, ABI_ERC20, signer)

  const contractBalance = await erc20.balanceOf(signerAddress).catch(console.error())
  return formatWeiToNumber(contractBalance)
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function getHeldShares(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_SUNBLOCK,
      ABI_SUNBLOCK,
      provider
    )
    const signAddr = await provider.getSigner().getAddress()
    const amount: BigNumber = await contract.shareholder(signAddr).catch(console.error())
    return amount.toNumber()
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function getSharesIssued(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_SUNBLOCK,
      ABI_SUNBLOCK,
      provider
    )
    const amount: BigNumber = await contract.sharesIssued().catch(console.error())
    return amount.toNumber()
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function getInvestmentFund(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const contract = new ethers.Contract(
      TOKEN_ADDRESS_DEMOERC20,
      ABI_ERC20,
      provider
    )
    const amount: BigNumber = await contract.balanceOf(INVESTMENT_WALLET).catch(console.error())
    return formatWeiToNumber(amount)
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function getRewardFund(provider: ethers.providers.Web3Provider): Promise<number> {
  try {
    const contract = new ethers.Contract(
      TOKEN_ADDRESS_DEMOERC20,
      ABI_ERC20,
      provider
    )
    const amount: BigNumber = await contract.balanceOf(REWARD_WALLET)
    return formatWeiToNumber(amount)
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function getInvestmentVehicle(
  provider: ethers.providers.Web3Provider
): Promise<InvestmentVehicle | undefined> {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_SUNBLOCK,
      ABI_SUNBLOCK,
      provider
    )
    const vehicle: InvestmentVehicle = await contract.vehicle().catch(console.error())
    return vehicle
  } catch (error) {
    return undefined
  }
}
