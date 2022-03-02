// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { BigNumber, ethers } from 'ethers'
import { ABI_ERC20 } from '../programs/contracts'
import { TOKEN_ADDRESS_DEMOERC20 } from '../programs/polygon'
import { formatWeiToNumber } from '../utils/formaters'


export async function getStrongBalance(
  provider: ethers.providers.Web3Provider
): Promise<number | undefined> {
   async () => {
    try {
        const signer = provider.getSigner()
        if (signer === undefined) return
        const signerAddress = await signer.getAddress()
        const erc20 = new ethers.Contract(
          TOKEN_ADDRESS_DEMOERC20,
          ABI_ERC20,
          signer
        )
        if (!erc20) return
        const amount: BigNumber = await erc20.balanceOf(signerAddress)
        return formatWeiToNumber(amount)
      } catch (error) {
        console.log(error)
      }
   }
   return undefined

}
