// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { FC, useEffect, useState } from "react";
import { hooks } from '../../connectors/metamask';
import { AssetItem } from "./AssetItem";

let eth: any
const {useProvider} = hooks


export const AssetGroup: FC = () => {
    const provider = useProvider()
    const usdc = './usdc-logo.webp'
    const strong = './strong-strong-logo.webp'

    const [heldShares, setHeldShares] = useState(-1)



    useEffect(() => {
        eth = (window as any).ethereum

        const accChangeListner = (accounts:any) => {
            getHeldShares()
        }
        provider?.on('accountChanged', accChangeListner)


        return () => {
            provider?.removeListener('accountChanged', accChangeListner)
          }
    }, [provider])


    async function getHeldShares() {
        // const contract = new ethers.Contract(
        //   CONTRACT_ADDRESS_SUNBLOCK,
        //   ABI_SUNBLOCK,
        //   provider.current
        // )

        // const signAddr = await provider.current?.getSigner().getAddress()
        // const amount:BigNumber = await contract.shareCount(signAddr)
        // setHeldShares(amount.toNumber())
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