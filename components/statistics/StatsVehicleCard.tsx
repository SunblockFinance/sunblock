// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT

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
import { NetworkDetails, networks } from '../../blockchain/networks'
import { hooks } from '../../connectors/metamask'
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
  url: string
}

export const StatsVehicleCard: FC<VehicleProps> = (props) => {
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
  const { useChainId } = hooks

  const [expanded, setExpanded] = React.useState(false)
  const [investFund, setInvestFund] = useState('')
  const [rewardFund, setRewardFund] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [chain, setChain] = useState<NetworkDetails>()
  const chainid = useChainId()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    if (chainid !== 0 && chainid && contract !== '') {
      try {
        const connector = new ContractConnector(chainid)
        connector.getVehicleInvestmentPool(contract).then((amount) => {
          setInvestFund(amount)
        }).catch((e) => console.error)
        connector.getVehicleRewardPool(contract).then((amount) => {
          setRewardFund(amount)
        }).catch((e) => console.error)
      } catch (error) {
        console.error
      }
      setChain(networks[chainid])
    }





    return () => {
      setInvestFund('')
      setRewardFund('')
    }
  }, [contract, chainid])

  useEffect(() => {
    // If reward and invest fund is set, then we safely assume we can show the content.
    if (rewardFund !== '' && investFund !== '') {
      setIsLoading(false)
    }
  }, [rewardFund, investFund])

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
          maxWidth: '400px',
        }}
      >
        <CardHeader
          avatar={<Skeleton variant="circular" width={40} height={40} />}
          title={<Skeleton variant="text" />}
          subheader={<Skeleton variant="text" width="40%" />}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {<Skeleton variant="text" width="400px" />}
          </Typography>
        </CardContent>
        <Divider textAlign="left">CAPITAL</Divider>
        <AssetItem
          title="To be invested"
          value={<Skeleton variant="text" width="30%" />}
          icon={<Skeleton variant="circular" width={40} height={40} />}
        />
        <AssetItem
          title="Rewards held"
          value={<Skeleton variant="text" width="30%" />}
          icon={<Skeleton variant="circular" width={40} height={40} />}
        />

        <CardActions disableSpacing>
          <IconButton
            aria-label="view contract"
            href={`${chain?.chain.explorer}/address/${props.contract}`} //TODO: Follow the chain ID
          >
            <GavelIcon />
          </IconButton>
          <IconButton aria-label="share" href={props.url}>
            <LaunchIcon />
          </IconButton>
          {/* <ExpandMore  // FOR FUTURE EXPANTION
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore> */}
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
          maxWidth: '400px',
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
            href={`${chain?.chain.explorer.url || 'https://polyscan.com'}/address/${props.contract}`} //TODO: Follow the chain ID
          >
            <GavelIcon />
          </IconButton>
          <IconButton aria-label="share" href={props.url}>
            <LaunchIcon />
          </IconButton>
          {/* <ExpandMore  // FOR FUTURE EXPANTION
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore> */}
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
