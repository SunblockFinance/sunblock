// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { Avatar, LinearProgress, ListItemAvatar, Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import { orange } from '@mui/material/colors'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { useEffect, useState } from 'react'
import ContractConnector from '../blockchain/ContractConnector'
import { hooks } from '../connectors/metamask'
import {
  ContractDescriptor,
  NameToDescriptor
} from '../contracts/deployedContracts'
import styles from './InvestmentQueue.module.css'

// Web3 Provider
const { useProvider, useChainId, useIsActive } = hooks

export default function InvestmentQueue() {
  // State
  const [currentTargetAmount, setCurrentTargetAmount] = useState(0)
  const [currentVehicleName, setCurrentVehicleName] = useState('')
  const [nextVehicleName, setNextVehicleName] = useState('')
  const [nextTargetAmount, setNextTargetAmount] = useState(0)
  const [investmentFund, setInvestmentFund] = useState(0)
  const [inprogress, setInprogress] = useState(0)
  const [currentVehicleDescriptor, setCurrentVehicleDescriptor] =
    useState<ContractDescriptor>()
  const [nextVehicleDescriptor, setNextVehicleDescriptor] =
    useState<ContractDescriptor>()

  const chainid = useChainId()
  const isActive = useIsActive()

  useEffect(() => {
    if (!chainid || chainid === 0) return
    console.log(`QUEUE = ${chainid}`)
    try {
      const cube = new ContractConnector(chainid)
      setInprogress((prevcount) => prevcount + 1)
      cube.getCurrentTargetAmount().then((amount) => {
        setCurrentTargetAmount(amount || 0)
        setInprogress((prevcount) => prevcount - 1)
      }).catch((e) => console.error)
      setInprogress((prevcount) => prevcount + 1)
      cube.getCurrentTargetName().then((name) => {
        setCurrentVehicleDescriptor(NameToDescriptor(name || ''))
        setCurrentVehicleName(name || '')
        setInprogress((prevcount) => prevcount - 1)
      }).catch((e) => console.error)
      setInprogress((prevcount) => prevcount + 1)
      cube.getNextTargetAmount().then((amount) => {
        setNextTargetAmount(amount || 0)
        setInprogress((prevcount) => prevcount - 1)
      }).catch((e) => console.error)
      setInprogress((prevcount) => prevcount + 1)
      cube.getNextTargetName().then((name) => {
        setNextVehicleDescriptor(NameToDescriptor(name || ''))
        setNextVehicleName(name || '')
        setInprogress((prevcount) => prevcount - 1)
      }).catch((e) => console.error)
      setInprogress((prevcount) => prevcount + 1)
      cube.getCubeInvestmentFund().then((amount) => {
        setInvestmentFund(amount || 0)
        setInprogress((prevcount) => prevcount - 1)
      }).catch((e) => console.error)
    } catch (error) {
      console.error
    }

    return () => {
      setCurrentTargetAmount(0)
      setNextTargetAmount(0)
      setInvestmentFund(0)
      setCurrentVehicleName('')
    }
  }, [chainid])

  const vehicle_avatar_current_active = (
    <Avatar
      className={styles.inprogress}
      alt="Asset logo"
      src={currentVehicleDescriptor?.logo}
    />
  )
  const vehicle_avatar_next = (
    <Avatar alt="Asset logo" src={nextVehicleDescriptor?.logo} />
  )
  const warning_avatar = (
    <Avatar sx={{ bgcolor: orange[500] }} alt="Asset logo">
      <PriorityHighIcon />
    </Avatar>
  )

  if (inprogress !== 0) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: 300,
          backgroundColor: 'rgba(39,51,76,1)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <Skeleton variant="rectangular" width={200} height={50} />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <Skeleton variant="rectangular" width={200} height={50} />
        </ListItem>
      </Box>
    )
  } else {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: 300,
          backgroundColor: 'rgba(39,51,76,1)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {currentVehicleName === ''
              ? warning_avatar
              : vehicle_avatar_current_active}
          </ListItemAvatar>
          <ListItemText
            disableTypography={true}
            primary={`${
              currentVehicleName === '' ? 'No target' : currentVehicleName
            }`}
            secondary={
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  value={(investmentFund / currentTargetAmount) * 100}
                />
                {investmentFund} /{' '}
                {currentTargetAmount != 0 ? (
                  currentTargetAmount
                ) : (
                  <span>&#8734;</span>
                )}{' '}
                USDT
              </Box>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {nextVehicleName === '' ? warning_avatar : vehicle_avatar_next}
          </ListItemAvatar>
          <ListItemText
            disableTypography={true}
            primary={`${
              nextVehicleName === '' ? '😢 No target' : nextVehicleName
            }`}
            secondary={
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={0} />0 /{' '}
                {nextTargetAmount != 0 ? (
                  nextTargetAmount
                ) : (
                  <span>&#8734;</span>
                )}{' '}
                USDT
              </Box>
            }
          />
        </ListItem>
      </Box>
    )
  }
}
