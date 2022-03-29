// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { Avatar, LinearProgress, ListItemAvatar } from '@mui/material'
import Box from '@mui/material/Box'
import { orange } from '@mui/material/colors'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { useEffect, useState } from 'react'
import ContractConnector from '../blockchain/ContractConnector'
import { useGlobalState } from '../blockchain/networks'
import { hooks } from '../connectors/network'
import { NameToDescriptor } from '../contracts/deployedContracts'
import styles from './InvestmentQueue.module.css'

// Web3 Provider
const { useProvider } = hooks

export default function InvestmentQueue() {
  const provider = useProvider()
  // State
  const [currentTargetAmount, setCurrentTargetAmount] = useState(0)
  const [currentVehicleName, setCurrentVehicleName]= useState('')
  const [nextVehicleName, setNextVehicleName] = useState('')
  const [nextTargetAmount, setNextTargetAmount] = useState(0)
  const [investmentFund, setInvestmentFund] = useState(0)
  const [chainid, setChainid] = useGlobalState('chainid')



  useEffect(() => {
    const cube = new ContractConnector(chainid)
    cube.getCurrentTargetAmount().catch(() => console.error()).then((amount) => {
      setCurrentTargetAmount(amount || 0)
    })
    cube.getCurrentTargetName().catch(() => console.error()).then((name) => {
      setCurrentVehicleName(name || '')
    })
    cube.getNextTargetAmount().catch(() => console.error()).then((amount) => {
      setNextTargetAmount(amount || 0)
    })
    cube.getNextTargetName().catch(() => console.error()).then((name) => {
      setNextVehicleName(name || '')
    })
    cube.getCubeInvestmentFund().catch(() => console.error()).then((amount) => {
      setInvestmentFund(amount || 0)
    })

    return () => {
      setCurrentTargetAmount(0)
      setNextTargetAmount(0)
      setInvestmentFund(0)
      setCurrentVehicleName('')
    }
  }, [chainid])


  const currentDescriptor = NameToDescriptor(currentVehicleName)
  const nextDescriptor = NameToDescriptor(nextVehicleName)

  const vehicle_avatar_current_active = <Avatar className={styles.inprogress}  alt="Asset logo" src={currentDescriptor.logo} />
  const vehicle_avatar_next = <Avatar alt="Asset logo" src={nextDescriptor.logo} />
  const warning_avatar = <Avatar sx={{ bgcolor: orange[500] }} alt="Asset logo" ><PriorityHighIcon/></Avatar>


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
      <ListItem  alignItems="flex-start" >
      <ListItemAvatar>
        {(currentVehicleName==='')?warning_avatar:vehicle_avatar_current_active}
      </ListItemAvatar>
      <ListItemText
        disableTypography={true}
        primary={`${(currentVehicleName==='')?"No target":currentVehicleName}`}
        secondary={
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={(investmentFund/currentTargetAmount)*100} />
            {investmentFund} / {(currentTargetAmount!=0)?currentTargetAmount:<span>&#8734;</span>} USDT
          </Box>
        }
      />
    </ListItem>
    <ListItem alignItems="flex-start"  >
      <ListItemAvatar>
        {(nextVehicleName==='')?warning_avatar:vehicle_avatar_next}
      </ListItemAvatar>
      <ListItemText
        disableTypography={true}
        primary={`${(nextVehicleName==='')?"😢 No target":nextVehicleName}`}
        secondary={
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={0} />
            0 / {(nextTargetAmount!=0)?nextTargetAmount:<span>&#8734;</span>} USDT
          </Box>
        }
      />
    </ListItem>

    </Box>
  )
}
