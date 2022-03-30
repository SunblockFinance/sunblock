// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { createGlobalState } from 'react-hooks-global-state'
export interface NetworkDetails {
    chainid: number
    cubeContract: string
    cubeNativeToken: string
    vehicleContracts: Array<string>
    providerURL: string
  }

  const polygonMainnet: NetworkDetails = {
    chainid: 137,
    cubeContract: '0x21A281CE0258A9F7E38B6df5439F6E118BBAabCc',
    vehicleContracts: [
      '0xBBF075ADD207cbf1360d3E0bB0C8C81b016EE4c9',
      '0x9f5f595018215754Bd64446d8F369eA0726fDFf9',
    ],
    cubeNativeToken: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    providerURL:'wss://ws-matic-mainnet.chainstacklabs.com'
  }

  const polygonMumbai: NetworkDetails = {
    chainid: 80001,
    cubeContract: '0xe3d5aD93d841F7cCBcE2c506C9A9a1c587Ba9C9F',
    vehicleContracts: [
      '0x76461B90c86cd411f5d56C1Bb349ae27C645441A',
      '0x334e65fd4e98b03c25Bcf6797Fe034551E4C2d0B',
    ],
    cubeNativeToken: '0x2AF8C95864dAF017906b310C4910C4B1b1E55499',
    providerURL: 'wss://ws-matic-mumbai.chainstacklabs.com'
  }

  const avalanchTest: NetworkDetails = {
      chainid: 43113,
      cubeContract: '0x9e937413A629Eb060461589E1Ba8e17A0E41f4Db',
      vehicleContracts: [
        '0x5a2632E4125e3f1d5E19095E458D2E47da36350D',
        '0xE1eb7199A220AefF4F8Cc0559c69b4cB7144f73f',
      ],
      cubeNativeToken: '0x020E3EB05a80aB431F37171Fa5Bd0f175E62Ca0F',
      providerURL: 'wss://speedy-nodes-nyc.moralis.io/2d2738f646742fb6e4ae69e0/avalanche/testnet/ws'
    }

  export const networks = new Map<number, NetworkDetails>([
    [137, polygonMainnet],
    [80001, polygonMumbai],
    [43113, avalanchTest]
  ])


  export const { useGlobalState } = createGlobalState({chainid: 0})