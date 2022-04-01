// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { Container, Stack } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { networks, VehicleContractDetails } from '../../blockchain/networks'
import { hooks } from '../../connectors/metamask'
import {
  ContractDescriptor
} from '../../contracts/deployedContracts'
import { StatsVehicleCard } from './StatsVehicleCard'

const { useChainId } = hooks

export const StatsOverview: FC = () => {
  const [currentVehicle, setCurrentVehicle] = useState<ContractDescriptor>()
  const [currentVehicleContract, setCurrentVehicleContract] = useState('')
  const [nextVehicle, setNextVehicle] = useState<ContractDescriptor>()
  const [nextVehicleContract, setNextVehicleContract] = useState('')
  const chainid = useChainId()
  const [deployedVehicles, setDeployedVehicles] = useState<Array<VehicleContractDetails>>()

  useEffect(() => {
    if (chainid) {
      const currentNetwork = networks[chainid]
      setDeployedVehicles(currentNetwork?.vehicleContracts)
    }

    return () => {

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
        {deployedVehicles?.map(_vehicle => (
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
