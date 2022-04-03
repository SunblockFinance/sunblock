// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { Container, Stack } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { NetworkDetails, networks } from '../../blockchain/networks'
import { hooks } from '../../connectors/metamask'
import { StatsVehicleCard } from './StatsVehicleCard'

const { useChainId } = hooks

export const StatsOverview: FC = () => {
  const chainid = useChainId()
  const [chainDetails, setChainDetails] = useState<NetworkDetails>()

  useEffect(() => {
    if (chainid) {
      setChainDetails(networks[chainid])
    }

    return () => {
      setChainDetails(undefined)
    }
  }, [chainid])


  return (
    <Container
      sx={{
        outlineStyle: 'solid',
        outlineColor: 'gray',
        borderRadius: '5px',
        backgroundColor: 'rgba(56,71,80,0.5)',
        backdropFilter: 'blur(8px)',
        padding: '20px',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        justifyContent="space-around"
        alignItems="stretch"
      >
        {chainDetails?.vehicleContracts?.map(_vehicle => (
          <StatsVehicleCard
          key={_vehicle.address}
          contract={_vehicle.address}
          title={_vehicle.name || ''}
          logo={_vehicle.logo || ''}
          description={
            _vehicle.description ||
            'Loading up the next great thing. Give it a second...'
          }
          url={_vehicle.url || ''}
        />
        ))}


      </Stack>
    </Container>
  )
}
