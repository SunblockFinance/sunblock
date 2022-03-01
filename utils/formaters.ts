// Copyright 2022 Kenth Fagerlund.

import { BigNumber, ethers } from "ethers"

// SPDX-License-Identifier: MIT
export const formatWeiToString = (wei:BigNumber): string => {
    const eth = ethers.utils.formatEther(wei)
    return (+eth).toFixed(4)
}

export const formatWeiToNumber = (wei:BigNumber): number => {
    const weiString = formatWeiToString(wei)
    return Number(weiString)

}