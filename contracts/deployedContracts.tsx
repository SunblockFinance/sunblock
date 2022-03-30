// Copyright 2022 Kenth Fagerlund.

import { CONTRACT_ADDRESS_VEHICLE_STRONG, CONTRACT_ADDRESS_VEHICLE_YIELD } from "../programs/polygon"

// SPDX-License-Identifier: MIT
export interface ContractDescriptor {
    title: string
    logo: string
    description: string
    contract: string
    url: string
}

export const DESCRIPTOR_STRONGBLOCK:ContractDescriptor = {
    title:"Strongblock",
    logo:"/svg/strong-logo.svg",
    description:"StrongBlock is the first and only blockchain-agnostic protocol to reward nodes",
    contract:CONTRACT_ADDRESS_VEHICLE_STRONG,
    url:'https://strongblock.com/'
}

export const DESCRIPTOR_YIELDNODE:ContractDescriptor = {
    title:"Yieldnodes",
    logo:"/svg/yield-nodes-logo.svg",
    description:"YieldNodes is a complex, multi-tiered Node rental program based on the new blockchain-based economy",
    contract:CONTRACT_ADDRESS_VEHICLE_YIELD,
    url:'https://yieldnodes.com/'
}

export function NameToDescriptor(contractName:string):ContractDescriptor {
    switch (contractName) {
        case 'Strongblock':
            return DESCRIPTOR_STRONGBLOCK
        case 'Yieldnodes':
            return DESCRIPTOR_YIELDNODE
        default:
            return DESCRIPTOR_STRONGBLOCK
    }
}
