// Copyright 2022 Kenth Fagerlund.

export interface VehicleContractDetails {
  address: string
  name: string
  logo: string
  description: string
  url: string
}

export interface Explorer {
  name: string
  url: string
  standard: string
}

export interface NetworkDetails {
  cubeContract: string
  cubeNativeToken: string
  vehicleContracts: Array<VehicleContractDetails>
  providerURL: string
  chain: Chain
}

export interface Chain {
  name: string
  logo: string
  explorer: Explorer
}

export const networks: { [chainid: number]: NetworkDetails } = {
  137: {
    cubeContract: '0x21A281CE0258A9F7E38B6df5439F6E118BBAabCc',
    vehicleContracts: [
      {
        address: '0xBBF075ADD207cbf1360d3E0bB0C8C81b016EE4c9',
        name: 'Strongblock',
        logo: '/svg/strong-logo.svg',
        description:
          'StrongBlock is the first and only blockchain-agnostic protocol to reward nodes',
        url: 'https://strongblock.com/',
      },
      {
        address: '0x9f5f595018215754Bd64446d8F369eA0726fDFf9',
        name: 'Yieldnodes',
        logo: '/svg/yield-nodes-logo.svg',
        description:
          'YieldNodes is a complex, multi-tiered Node rental program based on the new blockchain-based economy',
        url: 'https://yieldnodes.com/',
      },
    ],
    cubeNativeToken: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    providerURL:
      'https://apis-sj.ankr.com/a2619343e18742269cd75b3d774b2dd7/fc5bf88d2604a7790ef5a8b216d87cc0/polygon/full/main',
    chain: {
      name: 'Polygon',
      logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/color/matic.svg',
      explorer: {
        name: 'polygonscan',
        url: 'https://polygonscan.com',
        standard: 'EIP3091',
      },
    },
  },
  80001: {
    cubeContract: '0xe3d5aD93d841F7cCBcE2c506C9A9a1c587Ba9C9F',
    vehicleContracts: [
      {
        address: '0x76461B90c86cd411f5d56C1Bb349ae27C645441A',
        name: 'Strongblock',
        logo: '/svg/strong-logo.svg',
        description:
          'StrongBlock is the first and only blockchain-agnostic protocol to reward nodes',
        url: 'https://strongblock.com/',
      },
      {
        address: '0x334e65fd4e98b03c25Bcf6797Fe034551E4C2d0B',
        name: 'Yieldnodes',
        logo: '/svg/yield-nodes-logo.svg',
        description:
          'YieldNodes is a complex, multi-tiered Node rental program based on the new blockchain-based economy',
        url: 'https://yieldnodes.com/',
      },
    ],
    cubeNativeToken: '0x2AF8C95864dAF017906b310C4910C4B1b1E55499',
    providerURL:
      'https://apis.ankr.com/ae5b5e85d5a94ee38490f6f20ec93c5b/fc5bf88d2604a7790ef5a8b216d87cc0/polygon/full/test',
    chain: {
      name: 'Polygon Mumbai',
      logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/color/matic.svg',
      explorer: {
        name: 'polygonscan',
        url: 'https://mumbai.polygonscan.com',
        standard: 'EIP3091',
      },
    },
  },
  43113: {
    cubeContract: '0x9e937413A629Eb060461589E1Ba8e17A0E41f4Db',
    vehicleContracts: [
      {
        address: '0x5a2632E4125e3f1d5E19095E458D2E47da36350D',
        name: 'Thor',
        logo: '/svg/thor.svg',
        description:
          "Gain passive income by leveraging THOR's Financial multi-chain yield-farming protocol",
        url: 'https://www.thor.financial/',
      },
      {
        address: '0xE1eb7199A220AefF4F8Cc0559c69b4cB7144f73f',
        name: 'Etherstones',
        logo: '/etherstones.webp',
        description:
          'YieldNodes is a complex, multi-tiered Node rental program based on the new blockchain-based economy',
        url: 'https://etherstones.fi/',
      },
    ],
    cubeNativeToken: '0x020E3EB05a80aB431F37171Fa5Bd0f175E62Ca0F',
    providerURL: 'https://rpc.ankr.com/avalanche_fuji',
    chain: {
      name: 'Avalanche Fuji',
      logo: '/crypto-icons/avax.svg',
      explorer: {
        name: 'snowtrace',
        url: 'https://testnet.snowtrace.io',
        standard: 'EIP3091',
      },
    },
  },
}

export const DEFAULT_CHAINID = 137
