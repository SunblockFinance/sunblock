// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { Avatar, LinearProgress, ListItemAvatar } from '@mui/material'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { getCurrentTargetAmount, getInvestmentFund, getNextTargetAmount } from '../blockchain/query'
import { hooks } from '../connectors/metamask'
import styles from './InvestmentQueue.module.css'

// Web3 Provider
const { useProvider } = hooks

export default function InvestmentQueue() {
  const provider = useProvider()
  // State
  const [currentTargetAmount, setCurrentTargetAmount] = useState(0)
  const [nextTargetAmount, setNextTargetAmount] = useState(0)
  const [investmentFund, setInvestmentFund] = useState(0)


  useEffect(() => {
    if(provider){
      getCurrentTargetAmount(provider).then((amount) => {
        setCurrentTargetAmount(amount)
      })
      getNextTargetAmount(provider).then((amount) => {
        setNextTargetAmount(amount)
      })
      getInvestmentFund(provider).then((amount) => {
        setInvestmentFund(amount)
      })
    }
    return () => {
      setCurrentTargetAmount(0)
    }
  }, [provider])


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
      <ListItem  alignItems="flex-start"  >
      <ListItemAvatar>
        <Avatar className={styles.inprogress}  alt="Asset logo" src="/crypto-icons/strong.webp" />
      </ListItemAvatar>
      <ListItemText
        primary={`Strong node - in progress`}
        secondary={
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={Math.round((currentTargetAmount/investmentFund)*10)} />
            {investmentFund} / {currentTargetAmount} USDT
          </Box>
        }
      />
    </ListItem>
    <ListItem alignItems="flex-start"  >
      <ListItemAvatar>
        <Avatar   alt="Asset logo" src="/crypto-icons/strong.webp" />
      </ListItemAvatar>
      <ListItemText
        primary={`Strong node`}
        secondary={
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={0} />
            0 / {nextTargetAmount} USDT
          </Box>
        }
      />
    </ListItem>

    </Box>
  )
}
