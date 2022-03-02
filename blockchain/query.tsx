// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { ethers } from 'ethers'
import { ABI_ERC20 } from '../programs/contracts'
import { TOKEN_ADDRESS_DEMOERC20 } from '../programs/polygon'
import { formatWeiToNumber } from '../utils/formaters'

export async function getStrongBalance(
  provider: ethers.providers.Web3Provider
): Promise<number>  {
  console.log('Loading Strong balance')

  const signer = provider.getSigner()
  if (signer === undefined) return 4
  const signerAddress = await signer.getAddress()

  const erc20 = new ethers.Contract(
    TOKEN_ADDRESS_DEMOERC20,
    ABI_ERC20,
    signer
  )

  const contractBalance = await erc20.balanceOf(signerAddress)

  console.log("Strong balance is ", formatWeiToNumber(contractBalance));
    return   formatWeiToNumber(contractBalance)


}
