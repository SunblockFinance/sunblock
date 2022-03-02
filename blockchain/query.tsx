// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { BigNumber, ethers } from 'ethers'
import { ABI_ERC20, ABI_SUNBLOCK } from '../programs/contracts'
import { CONTRACT_ADDRESS_SUNBLOCK, INVESTMENT_WALLET, TOKEN_ADDRESS_DEMOERC20 } from '../programs/polygon'
import { formatWeiToNumber } from '../utils/formaters'

export async function getStrongBalance(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  const signer = provider.getSigner()
  if (signer === undefined) return 0
  const signerAddress = await signer.getAddress()

  const erc20 = new ethers.Contract(TOKEN_ADDRESS_DEMOERC20, ABI_ERC20, signer)

  const contractBalance = await erc20.balanceOf(signerAddress)
  return formatWeiToNumber(contractBalance)
}


export async function getHeldShares(provider: ethers.providers.Web3Provider) {
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS_SUNBLOCK,
    ABI_SUNBLOCK,
    provider
  )
  const signAddr = await provider.getSigner().getAddress()
  const amount:BigNumber = await contract.shareholder(signAddr)
  return amount.toNumber()
}

export async function getSharesIssued(provider: ethers.providers.Web3Provider) {
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS_SUNBLOCK,
    ABI_SUNBLOCK,
    provider
  )
  const amount:BigNumber = await contract.sharesIssued()
  return amount.toNumber()
}

export async function getInvestmentFund(provider: ethers.providers.Web3Provider) {
  const contract = new ethers.Contract(
    TOKEN_ADDRESS_DEMOERC20,
    ABI_ERC20,
    provider
  )
  const amount:BigNumber = await contract.balanceOf(INVESTMENT_WALLET)
  return formatWeiToNumber(amount)
}
