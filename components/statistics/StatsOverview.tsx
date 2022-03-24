// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { Container, Stack } from '@mui/material'
import { FC } from 'react'
import {
  DESCRIPTOR_STRONGBLOCK,
  DESCRIPTOR_YIELDNODE
} from '../../contracts/deployedContracts'
import { StatsVehicleCard } from './StatsVehicleCard'

export const StatsOverview: FC = () => {
  return (
    <Container
        sx={{
          outlineStyle: 'solid',
          outlineColor: 'gray',
          borderRadius: '5px',
          backgroundColor: 'rgba(56,71,80,0.5)',
          backdropFilter: 'blur(8px)',
          padding: '20px',
          width: '100%',
        }}
      >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignContent='space-evenly'>
        <StatsVehicleCard
          title={DESCRIPTOR_STRONGBLOCK.title}
          logo={DESCRIPTOR_STRONGBLOCK.logo}
          description={DESCRIPTOR_STRONGBLOCK.description}
          contract={DESCRIPTOR_STRONGBLOCK.contract}
          url={DESCRIPTOR_STRONGBLOCK.url}
        />
        <StatsVehicleCard
          title={DESCRIPTOR_YIELDNODE.title}
          logo={DESCRIPTOR_YIELDNODE.logo}
          description={DESCRIPTOR_YIELDNODE.description}
          contract={DESCRIPTOR_YIELDNODE.contract}
          url={DESCRIPTOR_YIELDNODE.url}
        />
      </Stack>
    </Container>
  )
}
