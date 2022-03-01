// Copyright 2022 Kenth Fagerlund.

import { BigNumber, ethers } from "ethers"

// SPDX-License-Identifier: MIT
export const formatWeiToString = (wei:BigNumber): string => {
    try {
        const eth = ethers.utils.formatEther(wei)
        return (+eth).toFixed(4)
    } catch (error:any) {
        console.log(error)
    }
    return ""
}

export const formatWeiToNumber = (wei:BigNumber): number => {
   try {
    const weiString = formatWeiToString(wei)
    return Number(weiString)
   } catch (error:any) {
       console.log(error)
   }
    return 0

}