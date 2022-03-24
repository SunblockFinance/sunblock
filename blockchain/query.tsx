// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { BigNumber, ethers } from 'ethers'
import { ABI_ERC20 } from '../contracts/abi/erc20'
import { ABI_SUNBLOCK_CUBE } from '../contracts/abi/sunblock'
import { CONTRACT_ADDRESS_CUBE, TOKEN_ADDRESS_USDT } from '../programs/polygon'
import { formatUSDTWeiToNumber } from '../utils/formaters'


/**
 *
 * @param provider metamask provider
 * @returns amount of stable coins held by the address
 */
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


/**
 *
 * @param provider metamask provider
 * @returns amount of shares held by the specific address
 */
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
