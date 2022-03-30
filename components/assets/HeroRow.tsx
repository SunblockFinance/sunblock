// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import EventIcon from '@mui/icons-material/Event'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import PollOutlinedIcon from '@mui/icons-material/PollOutlined'
import { Avatar, Divider, Stack } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import ContractConnector from '../../blockchain/ContractConnector'
import { useGlobalState } from '../../blockchain/networks'
import { hooks } from '../../connectors/metamask'
import InvestmentQueue from '../InvestmentQueue'
import { PurchaseShares } from '../PurchaseShare'
import { HeroItem } from './HeroItem'

const { useProvider } = hooks

export const HeroRow: FC = () => {
  const [userShares, setUserShares] = useState(0)
  const [sharesIssued, setSharesIssued] = useState(0)
  const [earnings, setEarnings] = useState(0)
  const [investFund, setInvestFund] = useState(0)
  const [rewardFund, setRewardFund] = useState(0)
  const [chainid, setChainid] = useGlobalState('chainid')

  const provider = useProvider()

  useEffect(() => {
    if (chainid !== 0) {
      const cube = new ContractConnector(chainid)
      cube
        .getCubeInvestmentFund()
        .then((amount) => {
          setInvestFund(amount)
        })
        .catch(() => console.error)
      cube
        .getCubeRewardFund()
        .then((amount) => {
          setRewardFund(amount)
        })
        .catch(() => console.error)
      cube
        .getSharesIssued()
        .then((amount) => {
          setSharesIssued(amount)
        })
        .catch(() => console.error)
    }

    return () => {
      setInvestFund(0)
      setRewardFund(0)
      setSharesIssued(0)
    }
  }, [chainid])

  useEffect(() => {
    if (provider && chainid !== 0) {
      const cube = new ContractConnector(chainid)
      provider
        .getSigner()
        .getAddress()
        .then((address) => {
          cube
            .getHeldShares(address)
            .then((shares) => {
              setUserShares(shares)
            })
            .catch(() => console.error)
        })
        .catch(() => console.error)
    }

    return () => {
      setUserShares(0)
    }
  }, [provider, chainid])

  /**
   * Estimate the reward the user should expect next
   */
  useEffect(() => {
    const rewardPerShare = rewardFund / sharesIssued
    const userEarningEstimate = rewardPerShare * userShares
    if (Number.isNaN(userEarningEstimate)) {
      setEarnings(0)
    } else {
      setEarnings(userEarningEstimate)
    }

    return () => {
      setEarnings(0)
    }
  }, [rewardFund, userShares, sharesIssued])

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={6}
      justifyContent="space-between"
    >
      <HeroItem
        title="Next investment"
        icon={<PollOutlinedIcon fontSize="large" />}
      >
        <Stack direction="column" alignItems="center" spacing={2}>
          <InvestmentQueue />
        </Stack>
      </HeroItem>

      <HeroItem
        title="Estimated earning"
        subtitle={`${userShares} shares owned by you`}
        icon={<MonetizationOnOutlinedIcon fontSize="large" />}
      >
        <Divider textAlign="left">Estimated earnings</Divider>
        <Stack direction="row">
          <Avatar src="/crypto-icons/usdt.svg"></Avatar>
          <span style={{ fontWeight: 'bold', fontSize: 24 }}>
            &nbsp;{`${earnings.toFixed(2)} USDT`}
          </span>
        </Stack>
        <br />
        <Divider textAlign="left">Reward day</Divider>
        <Stack direction="row">
          <Avatar sx={{ backgroundColor: 'transparent' }}>
            <EventIcon fontSize="large" color="info" />
          </Avatar>
          <span style={{ fontWeight: 'bold', fontSize: 24 }}>
            &nbsp;{`ETA 6 days`}
          </span>
        </Stack>
      </HeroItem>
      <HeroItem
        title="Purchase shares"
        subtitle="Each share is 10 USDT"
        avatar="./crypto-icons/usdt.svg"
        promote
      >
        <PurchaseShares />
      </HeroItem>
    </Stack>
  )
}
