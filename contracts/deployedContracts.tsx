// Copyright 2022 Kenth Fagerlund.

import { CONTRACT_ADDRESS_VEHICLE_STRONG, CONTRACT_ADDRESS_VEHICLE_YIELD } from "../programs/polygon"

// SPDX-License-Identifier: MIT
export interface ContractDescriptor {
    title: string
    logo: string
    description: string
    contract: string
}

export const DESCRIPTOR_STRONGBLOCK:ContractDescriptor = {
    title:"Strongblock",
    logo:"/svg/strong-logo.svg",
    description:"StrongBlock is the first and only blockchain-agnostic protocol to reward nodes for supporting the infrastructure of their blockchain.",
    contract:CONTRACT_ADDRESS_VEHICLE_STRONG,
}

export const DESCRIPTOR_YIELDNODE:ContractDescriptor = {
    title:"Yieldnodes",
    logo:"/svg/yield-nodes-logo.svg",
    description:"YieldNodes is a complex, multi-tiered Node rental program based on the new blockchain-based economy",
    contract:CONTRACT_ADDRESS_VEHICLE_YIELD,
}

export function NameToDescriptor(contractName:string):ContractDescriptor {
    switch (contractName) {
        case 'Strongblock':
            return DESCRIPTOR_STRONGBLOCK
            break;
        case 'Yieldnodes':
            return DESCRIPTOR_YIELDNODE
            break
        default:
            return DESCRIPTOR_STRONGBLOCK
            break;
    }
}