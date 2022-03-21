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
import { getCurrentTargetAmount, getCurrentTargetName, getInvestmentFund, getNextTargetAmount, getNextTargetName } from '../blockchain/query'
import { hooks } from '../connectors/metamask'
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



  useEffect(() => {
    if(provider){
      getCurrentTargetAmount(provider).then((amount) => {
        setCurrentTargetAmount(amount)
      })
      getCurrentTargetName(provider).then((name) => {
        setCurrentVehicleName(name)
      })
      getNextTargetAmount(provider).then((amount) => {
        setNextTargetAmount(amount)
      })
      getNextTargetName(provider).then((name) => {
        setNextVehicleName(name)
      })
      getInvestmentFund(provider).then((amount) => {
        setInvestmentFund(amount)
      })

    }
    return () => {
      setCurrentTargetAmount(0)
      setNextTargetAmount(0)
      setInvestmentFund(0)
      setCurrentVehicleName('')
    }
  }, [provider])

  const strong_avatar = <Avatar alt="Asset logo" src="/crypto-icons/strong.webp" />
  const strong_avatar_active = <Avatar className={styles.inprogress}  alt="Asset logo" src="/crypto-icons/strong.webp" />
  const warning_avatar = <Avatar sx={{ bgcolor: orange[500] }} alt="Asset logo" ><PriorityHighIcon/></Avatar>

  console.log('MATH',(investmentFund/currentTargetAmount)*100);

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
        {(currentVehicleName==='')?warning_avatar:strong_avatar_active}
      </ListItemAvatar>
      <ListItemText
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
        {(nextVehicleName==='')?warning_avatar:strong_avatar}
      </ListItemAvatar>
      <ListItemText
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
