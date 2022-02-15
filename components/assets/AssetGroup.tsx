import { Container, Stack } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { FC } from "react";
import { AssetItem } from "./AssetItem";

export const AssetGroup: FC = () => {
    const background = blueGrey[700]
    const usdc = './usdc-logo.png'
    const strong = './strong-strong-logo.png'



    return (
        <>
        <Container sx={{ borderRadius:'15px', backgroundColor:'rgba(77,156,175,0.3)', backdropFilter: "blur(8px)", padding:'20px', width:'100%' }}>
            <Stack spacing={2} direction='column'>
            <Stack direction='row' spacing={2} justifyContent='space-between'>
                <AssetItem title="Nodes owned" value="122" avatar={usdc}/>
                <AssetItem title="Capital Waiting To Be Invested" value="$122" avatar={usdc}/>
                <AssetItem title="Total investment" value="$123,000" avatar={usdc}/>
            </Stack>
            <Stack direction='row' spacing={2} justifyContent='space-between'>
                <AssetItem title="Community shareholders" value="125" avatar={usdc}/>
                <AssetItem title="Capital Waiting To Be Invested" value="$122" avatar={usdc}/>
                <AssetItem  title="Rewards accumulated" value="122.223 STRONG" avatar={strong}/>
            </Stack>
            <Stack direction='row' spacing={2} justifyContent='space-between'>
                <AssetItem title="Community shareholders" value="125" avatar={usdc}/>
                <AssetItem title="Capital Waiting To Be Invested" value="$122" avatar={usdc}/>
                <AssetItem  title="Rewards accumulated" value="122.223 STRONG" avatar={strong}/>
            </Stack>
            </Stack>
        </Container>


        </>

    )
}