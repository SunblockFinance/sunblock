// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { BigNumber, ethers } from "ethers";
import Moralis from "moralis";
import { FC, useEffect, useState } from "react";
import { ABI_SUNBLOCK } from "../../programs/contracts";
import { CONTRACT_ADDRESS_SUNBLOCK } from "../../programs/polygon";
import { AssetItem } from "./AssetItem";

export const AssetGroup: FC = () => {
    const usdc = './usdc-logo.webp'
    const strong = './strong-strong-logo.webp'

    const [heldShares, setHeldShares] = useState(-1)


    useEffect(() => {
        const enableEmitter = Moralis.onWeb3Enabled(() => {
            getHeldShares()
        })
        const accEmitter = Moralis.onAccountChanged(() => {
            getHeldShares()
        })
        return () => {
            accEmitter()
            enableEmitter()
          }
    }, [])


    async function getHeldShares() {

        const w3 = Moralis.web3!
        const provider = new ethers.providers.Web3Provider(w3.provider, 'any')
        const signer = w3.getSigner()
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS_SUNBLOCK,
          ABI_SUNBLOCK,
          provider
        )

        const amount:BigNumber = await contract.shareCount(await signer.getAddress())
        setHeldShares(amount.toNumber())
      }



    return (
        <>
        <Container sx={{outlineStyle:'solid', outlineColor:'gray', borderRadius:'5px', backgroundColor:'rgba(56,71,80,0.5)', backdropFilter: "blur(8px)", padding:'20px', width:'100%' }}>
            <Stack spacing={2} direction='column'>
            <Stack direction={{xs:'column', md:'row'}} spacing={2} justifyContent='space-between'>
                <AssetItem title="Shared owned by you" value={heldShares.toString()} avatar={usdc}/>
                <AssetItem title="Capital Waiting To Be Invested" value="$122" avatar={usdc}/>
                <AssetItem title="Total investment" value="$123,000" avatar={usdc}/>
            </Stack>
            <Stack direction={{xs:'column', md:'row'}} spacing={2} justifyContent='space-between'>
                <AssetItem title="Community shareholders" value="125" avatar={usdc}/>
                <AssetItem title="Capital Waiting To Be Invested" value="$122" avatar={usdc}/>
                <AssetItem  title="Rewards accumulated" value="122.223 STRONG" avatar={strong}/>
            </Stack>
            <Stack direction={{xs:'column', md:'row'}} spacing={2} justifyContent='space-between'>
                <AssetItem title="Community shareholders" value="125" avatar={usdc}/>
                <AssetItem title="Capital Waiting To Be Invested" value="$122" avatar={usdc}/>
                <AssetItem  title="Rewards accumulated" value="122.223 STRONG" avatar={strong}/>
            </Stack>
            </Stack>
        </Container>


        </>

    )
}