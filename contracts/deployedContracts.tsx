// Copyright 2022 Kenth Fagerlund.

// SPDX-License-Identifier: MIT
export interface ContractDescriptor {
    title: string
    logo: string
    description: string
    url: string
}

export const DESCRIPTOR_STRONGBLOCK:ContractDescriptor = {
    title:"Strongblock",
    logo:"/svg/strong-logo.svg",
    description:"StrongBlock is the first and only blockchain-agnostic protocol to reward nodes",
    url:'https://strongblock.com/'
}

export const DESCRIPTOR_YIELDNODE:ContractDescriptor = {
    title:"Yieldnodes",
    logo:"/svg/yield-nodes-logo.svg",
    description:"YieldNodes is a complex, multi-tiered Node rental program based on the new blockchain-based economy",
    url:'https://yieldnodes.com/'
}

export const DESCRIPTOR_THOR:ContractDescriptor = {
    title:"Thor",
    logo:"/svg/thor.svg",
    description:"Gain passive income by leveraging THOR's Financial multi-chain yield-farming protocol",
    url:'https://www.thor.financial/'
}

export const DESCRIPTOR_POLAR:ContractDescriptor = {
    title:"Polar",
    logo:"/svg/polar.svg",
    description:"Poloar nodes",
    url:'https://www.polar.financial/'
}

export const DESCRIPTOR_ANCHOR:ContractDescriptor = {
    title:"Anchor",
    logo:"/svg/anchor.svg",
    description:"Anchor",
    url:'https://www.anchor.financial/'
}

export const DESCRIPTOR_ETHERSTONES:ContractDescriptor = {
    title:"Etherstones",
    logo:"/etherstones.webp",
    description:"YieldNodes is a complex, multi-tiered Node rental program based on the new blockchain-based economy",
    url:'https://etherstones.fi/'
}

export const DESCRIPTOR_PHOENIX:ContractDescriptor = {
    title:"Phoenix",
    logo:"/crypto-icons/fire.png",
    description:"Fire nodes",
    url:'https://thephoenix.finance/app/'
}

export function NameToDescriptor(contractName:string):ContractDescriptor {
    switch (contractName) {
        case 'Strongblock':
            return DESCRIPTOR_STRONGBLOCK
        case 'Yieldnodes':
            return DESCRIPTOR_YIELDNODE
        case 'Polar':
            return DESCRIPTOR_POLAR
        case 'Thor':
            return DESCRIPTOR_THOR
        case 'Etherstones':
            return DESCRIPTOR_ETHERSTONES
        case 'Phoenix':
            return DESCRIPTOR_PHOENIX
        default:
            return DESCRIPTOR_STRONGBLOCK
    }
}
