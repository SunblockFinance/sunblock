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
  cubeNativeTokenName: string
  cubeNativeTokenDecimals: number
  cubeNativeTokenLogo: string
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
    cubeNativeTokenName: 'USDT',
    cubeNativeTokenDecimals: 6,
    cubeNativeTokenLogo: './crypto-icons/usdt.svg',
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
    cubeNativeTokenName: 'USDT',
    cubeNativeTokenDecimals: 6,
    cubeNativeTokenLogo: './crypto-icons/usdt.svg',
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
    cubeNativeTokenName: 'USDT.e',
    cubeNativeTokenDecimals: 6,
    cubeNativeTokenLogo: './crypto-icons/usdt.svg',
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
  43114: {
    cubeContract: '0xCcECc32caA42A25BAEf6B2A1dBFF2C6C79Adf2cA',
    vehicleContracts: [
      {
        address: '0x59A974776C25080328A7480Af4EbaD72b9D3dda1',
        name: 'Polar nodes',
        logo: '/svg/polar.svg',
        description: 'A fully decentralized Node Protocol on Avalanche',
        url: 'https://polarnodes.finance/',
      },
      {
        address: '0x4943Ee1090d92f143E44631DC07aF88f5BE50287',
        name: 'Anchor protocol',
        logo: '/svg/anchor.svg',
        description: 'Better savings',
        url: 'https://www.anchorprotocol.com/',
      },
      {
        address: '0x9e937413A629Eb060461589E1Ba8e17A0E41f4Db',
        name: 'Etherstones',
        logo: '/etherstones.webp',
        description: 'Etherstones is an innovative DaaS on the Avalanche',
        url: 'https://etherstones.fi/',
      },
    ],
    cubeNativeToken: '0xc7198437980c041c805a1edcba50c1ce5db95118',
    cubeNativeTokenName: 'USDT.e',
    cubeNativeTokenDecimals: 6,
    cubeNativeTokenLogo: './crypto-icons/usdt.svg',
    providerURL: 'https://rpc.ankr.com/avalanche',
    chain: {
      name: 'Avalanche Mainnet',
      logo: '/crypto-icons/avax.svg',
      explorer: {
        name: 'snowtrace',
        url: 'https://snowtrace.io',
        standard: 'EIP3091',
      },
    },
  },
  250: {
    cubeContract: '0xF054c307A72bbe7b5E6D7831C04bFc6E93f97eA4',
    cubeNativeToken: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
    cubeNativeTokenName: 'fUSDT',
    cubeNativeTokenDecimals: 6,
    cubeNativeTokenLogo: './crypto-icons/usdt.svg',
    vehicleContracts: [
      {
        address: '0xbB360b04a49786EeCeFf029bb89bD0218bea6baA',
        name: 'Kingdoms',
        logo: '/kingdoms.png',
        description:
          'An easy-to-use tool to grow your riches - sacrifice Pawns to earn passive income.',
        url: 'https://kingdoms.financial/',
      },
      {
        address: '0xbB360b04a49786EeCeFf029bb89bD0218bea6baA',
        name: 'SpookyFarms',
        logo: '/svg/spookyswap.svg',
        description:
          'All in one decentralized exchange for leveraging diversified funds across ecosystems',
        url: 'https://spookyswap.finance/',
      },
    ],
    providerURL: 'https://rpc.ftm.tools/',
    chain: {
      name: 'Fantom',
      logo: './crypto-icons/ftm.svg',
      explorer: {
        name: 'Fantom Explorer',
        url: 'https://ftmscan.com/',
        standard: 'EIP3091',
      },
    },
  },
}

export const DEFAULT_CHAINID = 137
export const DEFAULT_TOKEN_NAME = 'USDT'
export const DEFAULT_TOKEN_LOGO = './crypto-icons/usdt.svg'
