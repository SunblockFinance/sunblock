// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { Container, Stack } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import ContractConnector from '../../blockchain/ContractConnector'
import { networks, useGlobalState } from '../../blockchain/networks'
import {
  ContractDescriptor, NameToDescriptor
} from '../../contracts/deployedContracts'
import { StatsVehicleCard } from './StatsVehicleCard'



export const StatsOverview: FC = () => {
  const [chainid, setChainid] = useGlobalState('chainid')
  const [currentVehicle, setCurrentVehicle] = useState<ContractDescriptor>()
  const [currentVehicleContract, setCurrentVehicleContract] = useState('')
  const [nextVehicle, setNextVehicle] = useState<ContractDescriptor>()
  const [nextVehicleContract, setNextVehicleContract] = useState('')


  useEffect(() => {
    console.log(`Getting vehicles for chain ${chainid}`);
    if (chainid !== 0) {
      const connector = new ContractConnector(chainid)
      const currentNetwork = networks.get(chainid)
      setCurrentVehicleContract(currentNetwork?.vehicleContracts[0] || '')
      setNextVehicleContract(currentNetwork?.vehicleContracts[1] || '')
      if (currentNetwork) {
        connector.getCurrentTargetName().then((name) => {
          setCurrentVehicle(NameToDescriptor(name))
        }).catch(() => console.error)
        connector.getNextTargetName().then((name) => {
          setNextVehicle(NameToDescriptor(name))
        }).catch(() => console.error)
      }
    }

    return () => {
      setCurrentVehicle(undefined)
      setNextVehicle(undefined)
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
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-around" alignItems="stretch">
          <StatsVehicleCard
          title={currentVehicle?.title || ''}
          logo={currentVehicle?.logo || ''}
          description={currentVehicle?.description || 'Loading up the next great thing. Give it a second...'}
          contract={currentVehicleContract || ''}
          url={currentVehicle?.url || ''}
        />
        <StatsVehicleCard
          title={nextVehicle?.title || ''}
          logo={nextVehicle?.logo || ''}
          description={nextVehicle?.description || 'Loading up the next great thing. Give it a second...'}
          contract={nextVehicleContract || ''}
          url={nextVehicle?.url || ''}
        />
      </Stack>
    </Container>
  )
}
