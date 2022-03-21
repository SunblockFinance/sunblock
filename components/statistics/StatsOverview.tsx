// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { Stack } from "@mui/material"
import { FC } from "react"
import { CONTRACT_ADDRESS_VEHICLE_STRONG, CONTRACT_ADDRESS_VEHICLE_YIELD } from "../../programs/polygon"
import { StatsVehicleCard } from "./StatsVehicleCard"

export const StatsOverview: FC = () => {

    return (

        <Stack direction='row' spacing={2}>
            <StatsVehicleCard title={"Strongblock"} logo={"/svg/strong-logo.svg"} description={"StrongBlock is the first and only blockchain-agnostic protocol to reward nodes for supporting the infrastructure of their blockchain."} contract={CONTRACT_ADDRESS_VEHICLE_STRONG}/>
            <StatsVehicleCard title={"Yieldnodes"} logo={"/svg/yield-nodes-logo.svg"} description={"YieldNodes is a complex, multi-tiered Node rental program based on the new blockchain-based economy"} contract={CONTRACT_ADDRESS_VEHICLE_YIELD}/>
        </Stack>


    )
}
