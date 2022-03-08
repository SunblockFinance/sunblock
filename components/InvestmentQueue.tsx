// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { Avatar, LinearProgress, ListItemAvatar } from '@mui/material'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import styles from './InvestmentQueue.module.css'


const promoted = {
  backgroundColor: 'rgba(77,156,175,0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0px 0px 20px 10px #7b4add',
}


function renderRow(props: ListChildComponentProps) {
  const { index, style } = props

  return (

    <ListItem style={style} alignItems="flex-start"  >
      <ListItemAvatar>
        <Avatar className={(index === 0)?styles.inprogress:''}  alt="Asset logo" src="/crypto-icons/strong.webp" />
      </ListItemAvatar>
      <ListItemText
        primary={(index ===0)?`Strong node - in progress`:`Strong node`}
        secondary={
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={44} />
            212.44 / 3434.22 USDT
          </Box>
        }
      />
    </ListItem>

  )
}

export default function InvestmentQueue() {
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
      <FixedSizeList
        height={140}
        width={300}
        itemSize={80}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  )
}
