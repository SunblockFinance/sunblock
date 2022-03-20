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

export const formatUSDTWeiToString = (wei:BigNumber): string => {
    try {
        const eth = ethers.utils.formatUnits(wei,6)
        return (+eth).toFixed(4)
    } catch (error:any) {
        console.log(error)
    }
    return ""
}

export const formatUSDTWeiToNumber = (wei:BigNumber): number => {
    try {
     const weiString = formatUSDTWeiToString(wei)
     return Number(weiString)
    } catch (error:any) {
        console.log(error)
    }
     return 0
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

export const shortenAddress = (address:string): string => {
    if (address === undefined) {return ''}
    const result = address.substring(0, 6) + '...' +  address.substring(address.length - 4);

    return result
}