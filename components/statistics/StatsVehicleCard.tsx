// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GavelIcon from '@mui/icons-material/Gavel'
import LaunchIcon from '@mui/icons-material/Launch'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  Skeleton,
  styled,
  Typography
} from '@mui/material'
import Divider from '@mui/material/Divider'
import React, { FC, useEffect, useState } from 'react'
import ContractConnector from '../../blockchain/ContractConnector'
import { useGlobalState } from '../../blockchain/networks'
import { ContractDescriptor } from '../../contracts/deployedContracts'
import { AssetItem } from '../assets/AssetItem'

const usdt = './crypto-icons/usdt.svg'
const treasure = './svg/buy-money.svg'
const withdrawl = './svg/withdrawl.svg'
const investment = './svg/investment.svg'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

interface VehicleProps {
  title: string
  logo: string
  description: string
  contract: string
}

export const StatsVehicleCard: FC<ContractDescriptor> = (props) => {
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }))

  const contract = props.contract



  const [expanded, setExpanded] = React.useState(false)
  const [investFund, setInvestFund] = useState('')
  const [rewardFund, setRewardFund] = useState('')
  const [chainid, setChainid] = useGlobalState('chainid')
  const [isLoading, setIsLoading] = useState(true)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    if (chainid !== 0 && contract !== '') {
      const connector = new ContractConnector(chainid)
      connector.getVehicleInvestmentPool(contract).then((amount) => {
        setInvestFund(amount)
      }).catch(() => console.error())
      connector.getVehicleRewardPool(contract).then((amount) => {
        setRewardFund(amount)
      }).catch(() => console.error())
    }

    return () => {
      setInvestFund('')
      setRewardFund('')
    }
  }, [contract, chainid])


  if (isLoading) {
    return (
      <Card
        sx={{
          outlineStyle: 'solid',
          outlineColor: 'gray',
          borderRadius: '5px',
          backgroundColor: 'rgba(56,71,80,0.5)',
          backdropFilter: 'blur(8px)',
          padding: '5px',
          maxWidth:'400px'

        }}
      >
        <CardHeader
          avatar={<Skeleton variant="circular" width={40} height={40} />}
          title={<Skeleton variant="text" />}
          subheader={<Skeleton variant="text" width='40%' />}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <Divider textAlign="left">CAPITAL</Divider>
        <AssetItem
          title="To be invested"
          value={`${investFund} USDT`}
          icon={<Skeleton variant="circular" width={40} height={40} />}
        />
        <AssetItem
          title="Rewards held"
          value={`${rewardFund} USDT`}
          icon={<Skeleton variant="circular" width={40} height={40} />}
        />

        <CardActions disableSpacing>
          <IconButton
            aria-label="view contract"
            href={`https://polygonscan.com/address/${props.contract}`} //TODO: Follow the chain ID
          >
            <GavelIcon />
          </IconButton>
          <IconButton aria-label="share" href={props.url}>
            <LaunchIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Divider textAlign="left">EVENTS</Divider>
            <AssetItem
              title="Reward transfer to cube"
              value={`12 Aug 2022`}
              avatar={withdrawl}
            />
            <AssetItem
              title="Last capital injection"
              value={`$2300 / 📅 12 Aug 2022`}
              avatar={investment}
            />
          </CardContent>
        </Collapse>
      </Card>
    )

  } else {
    return (
      <Card
        sx={{
          outlineStyle: 'solid',
          outlineColor: 'gray',
          borderRadius: '5px',
          backgroundColor: 'rgba(56,71,80,0.5)',
          backdropFilter: 'blur(8px)',
          padding: '5px',
          maxWidth:'400px'

        }}
      >
        <CardHeader
          avatar={<Avatar src={props.logo} aria-label="logo" />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.title}
          subheader="Active"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <Divider textAlign="left">CAPITAL</Divider>
        <AssetItem
          title="To be invested"
          value={`${investFund} USDT`}
          avatar={usdt}
        />
        <AssetItem
          title="Rewards held"
          value={`${rewardFund} USDT`}
          avatar={treasure}
        />

        <CardActions disableSpacing>
          <IconButton
            aria-label="view contract"
            href={`https://polygonscan.com/address/${props.contract}`} //TODO: Follow the chain ID
          >
            <GavelIcon />
          </IconButton>
          <IconButton aria-label="share" href={props.url}>
            <LaunchIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Divider textAlign="left">EVENTS</Divider>
            <AssetItem
              title="Reward transfer to cube"
              value={`12 Aug 2022`}
              avatar={withdrawl}
            />
            <AssetItem
              title="Last capital injection"
              value={`$2300 / 📅 12 Aug 2022`}
              avatar={investment}
            />
          </CardContent>
        </Collapse>
      </Card>
    )
  }
  }
