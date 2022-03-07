import { useEffect, useState } from "react"

export enum BlockChainNetwork {
    PolygonMain,
    PolygonMumbai
}
export interface BlockchainSettings {
    CONTRACT_ADDRESS_SUNBLOCK:string
    TOKEN_ADDRESS_USDC: string
    TOKEN_DECIMAL: number
    CHAINID: number
    REWARD_WALLET: string
    INVESTMENT_WALLET: string
    MANAGER_WALLET: string
}

export const PolygonMainNet:BlockchainSettings = {
    CONTRACT_ADDRESS_SUNBLOCK: '0x19b20dfF4cf302d217A30ADa7954c7d2D0131179',
    CHAINID: 137,
    INVESTMENT_WALLET: '0x1FFe3875819d27EFD9b0ece0E3E0C8a87e3E73cb',
    MANAGER_WALLET:'0xfE9Ae6A05dE748F9175c71a87AC0f9dfcE9A43c6',
    REWARD_WALLET:'0x19697686F5aC6d5e55E0DE72214471599245D230',
    TOKEN_ADDRESS_USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    TOKEN_DECIMAL: 6
}

export const PolygonMumbai:BlockchainSettings = {
    CONTRACT_ADDRESS_SUNBLOCK: '0x19b20dfF4cf302d217A30ADa7954c7d2D0131179',
    CHAINID: 137,
    INVESTMENT_WALLET: '0x1FFe3875819d27EFD9b0ece0E3E0C8a87e3E73cb',
    MANAGER_WALLET:'0xfE9Ae6A05dE748F9175c71a87AC0f9dfcE9A43c6',
    REWARD_WALLET:'0x19697686F5aC6d5e55E0DE72214471599245D230',
    TOKEN_ADDRESS_USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    TOKEN_DECIMAL: 6
}



export function useBlockchainSettings(network:BlockChainNetwork): BlockchainSettings {
    const [settings, setSettings] = useState<BlockchainSettings>(PolygonMumbai)

    useEffect(() => {
        switch (network) {
            case BlockChainNetwork.PolygonMain:
                setSettings(PolygonMainNet)
                break;
            case BlockChainNetwork.PolygonMumbai:
                setSettings(PolygonMainNet)
                break
            default:
                setSettings(PolygonMainNet)
                break;
        }

      return () => {
        setSettings(PolygonMumbai)
      }
    }, [network])

    return settings

}

// /**
//  * Address to main contract for sunblock
//  */
// export const CONTRACT_ADDRESS_SUNBLOCK = '0x19b20dfF4cf302d217A30ADa7954c7d2D0131179'

// /**
//  * Adress to DEMO ERC20 Token on testnet
//  */
// export const TOKEN_ADDRESS_USDC = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
// // export const TOKEN_ADDRESS_DEMOERC20 = '0x1379E8886A944d2D9d440b3d88DF536Aea08d9F3'

// //0x1379E8886A944d2D9d440b3d88DF536Aea08d9F3
// /**
//  * Currently supported block chain
//  */
// export const CHAINID = 137

// export const REWARD_WALLET = '0x19697686F5aC6d5e55E0DE72214471599245D230'
// export const INVESTMENT_WALLET = '0x1FFe3875819d27EFD9b0ece0E3E0C8a87e3E73cb'
// export const MANAGER_WALLET = '0xfE9Ae6A05dE748F9175c71a87AC0f9dfcE9A43c6'
