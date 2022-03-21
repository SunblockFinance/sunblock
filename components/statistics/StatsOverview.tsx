// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { Stack } from "@mui/material"
import { FC } from "react"
import { DESCRIPTOR_STRONGBLOCK, DESCRIPTOR_YIELDNODE } from "../../contracts/deployedContracts"
import { StatsVehicleCard } from "./StatsVehicleCard"

export const StatsOverview: FC = () => {

    return (
        <Stack direction='row' spacing={2}>
            <StatsVehicleCard title={DESCRIPTOR_STRONGBLOCK.title} logo={DESCRIPTOR_STRONGBLOCK.logo} description={DESCRIPTOR_STRONGBLOCK.description} contract={DESCRIPTOR_STRONGBLOCK.contract}/>
            <StatsVehicleCard title={DESCRIPTOR_YIELDNODE.title} logo={DESCRIPTOR_YIELDNODE.logo} description={DESCRIPTOR_YIELDNODE.description} contract={DESCRIPTOR_YIELDNODE.contract}/>
        </Stack>
    )
}
