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
    styled,
    Typography
} from '@mui/material'
import Divider from '@mui/material/Divider'
import React, { FC } from 'react'
import { AssetItem } from '../assets/AssetItem'

const usdt = './crypto-icons/usdt.svg'
const treasure = './svg/treasure.svg'
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
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{
        outlineStyle: 'solid',
        outlineColor: 'gray',
        borderRadius: '5px',
        backgroundColor: 'rgba(56,71,80,0.5)',
        backdropFilter: 'blur(8px)',
        padding: '0px',
        width: '100%',
      }}>
      <CardHeader
        avatar={
          <Avatar src={props.logo}  aria-label="logo"/>
        }
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
        value={`3000 USDT`}
        avatar={usdt}
      />
      <AssetItem title="Rewards held" value={`3300 USDT`} avatar={treasure} />

      <CardActions disableSpacing>
        <IconButton aria-label="view contract">
          <GavelIcon />
        </IconButton>
        <IconButton aria-label="share">
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
            <AssetItem title="Reward transfer to cube" value={`12 Aug 2022`} avatar={withdrawl} />
            <AssetItem title="Last capital injection" value={`$2300 / 📅 12 Aug 2022`} avatar={investment} />
        </CardContent>
      </Collapse>
    </Card>
  )
}
