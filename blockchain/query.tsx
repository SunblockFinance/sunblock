// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { BigNumber, ethers } from 'ethers'
import {
  ABI_ERC20,
  ABI_SUNBLOCK,
  InvestmentVehicle
} from '../programs/contracts'
import { BlockChainNetwork, useBlockchainSettings } from '../programs/polygon'
// import {
//   CONTRACT_ADDRESS_SUNBLOCK,
//   INVESTMENT_WALLET,
//   REWARD_WALLET,
//   TOKEN_ADDRESS_USDC
// } from '../programs/polygon'
import { formatUSDCWeiToNumber } from '../utils/formaters'



export async function GetUSDCBalance(provider: ethers.providers.Web3Provider): Promise<number> {
  const {TOKEN_ADDRESS_USDC} = useBlockchainSettings(BlockChainNetwork.PolygonMain)
  try {
    const signer = provider.getSigner()
  if (signer === undefined) return 0
  const signerAddress = await signer.getAddress()
  const erc20 = new ethers.Contract(TOKEN_ADDRESS_USDC, ABI_ERC20, signer)

  const contractBalance = await erc20.balanceOf(signerAddress).catch(console.error())
  return formatUSDCWeiToNumber(contractBalance)
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function GetStrongBalance(provider: ethers.providers.Web3Provider): Promise<number> {
  const {TOKEN_ADDRESS_USDC} = useBlockchainSettings(BlockChainNetwork.PolygonMain)
  try {
    const signer = provider.getSigner()
  if (signer === undefined) return 0
  const signerAddress = await signer.getAddress()
  const erc20 = new ethers.Contract(TOKEN_ADDRESS_USDC, ABI_ERC20, signer)

  const contractBalance = await erc20.balanceOf(signerAddress).catch(console.error())
  return formatUSDCWeiToNumber(contractBalance)
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function GetHeldShares(provider: ethers.providers.Web3Provider): Promise<number> {
  const {CONTRACT_ADDRESS_SUNBLOCK} = useBlockchainSettings(BlockChainNetwork.PolygonMain)
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

export async function GetSharesIssued(provider: ethers.providers.Web3Provider): Promise<number> {
  const {CONTRACT_ADDRESS_SUNBLOCK} = useBlockchainSettings(BlockChainNetwork.PolygonMain)
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

export async function GetInvestmentFund(provider: ethers.providers.Web3Provider): Promise<number> {
  const {TOKEN_ADDRESS_USDC, INVESTMENT_WALLET} = useBlockchainSettings(BlockChainNetwork.PolygonMain)
  try {
    const contract = new ethers.Contract(
      TOKEN_ADDRESS_USDC,
      ABI_ERC20,
      provider
    )
    const amount: BigNumber = await contract.balanceOf(INVESTMENT_WALLET).catch(console.error())
    return formatUSDCWeiToNumber(amount)
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function GetRewardFund(provider: ethers.providers.Web3Provider): Promise<number> {
  const {TOKEN_ADDRESS_USDC, REWARD_WALLET} = useBlockchainSettings(BlockChainNetwork.PolygonMain)
  try {
    const contract = new ethers.Contract(
      TOKEN_ADDRESS_USDC,
      ABI_ERC20,
      provider
    )
    const amount: BigNumber = await contract.balanceOf(REWARD_WALLET)
    return formatUSDCWeiToNumber(amount)
  } catch (error) {
    console.log(error);
    return 0
  }
}

export async function GetInvestmentVehicle(
  provider: ethers.providers.Web3Provider
): Promise<InvestmentVehicle | undefined> {
  const {CONTRACT_ADDRESS_SUNBLOCK} = useBlockchainSettings(BlockChainNetwork.PolygonMain)
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

export async function GetShareholderCount(provider: ethers.providers.Web3Provider): Promise<number> {
  const {CONTRACT_ADDRESS_SUNBLOCK} = useBlockchainSettings(BlockChainNetwork.PolygonMain)
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_SUNBLOCK,
      ABI_SUNBLOCK,
      provider
    )
    const amount: BigNumber = await contract.shareHolderCount().catch(console.error())
    return amount.toNumber()
  } catch (error) {
    console.log(error);
    return 0
  }
}
