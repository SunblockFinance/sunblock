// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import PollOutlinedIcon from '@mui/icons-material/PollOutlined'
import { Stack, styled } from '@mui/material'
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress'
import CoinGecko from 'coingecko-api'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { CoinGeckoPrice } from '../../blockchain/coingecko'
import {
  getHeldShares,
  getInvestmentFund,
  getRewardFund,
  getSharesIssued
} from '../../blockchain/query'
import { hooks } from '../../connectors/network'
import InvestmentQueue from '../InvestmentQueue'
import { PurchaseShares } from '../PurchaseShare'
import { HeroItem } from './HeroItem'

const { useProvider } = hooks

export const HeroRow: FC = () => {
  const [strongNodes, setStrongNodes] = useState(0)
  const [userShares, setUserShares] = useState(0)
  const [sharesIssued, setSharesIssued] = useState(0)
  const [earnings, setEarnings] = useState(0)
  const [investFund, setInvestFund] = useState(0)
  const [rewardFund, setRewardFund] = useState(0)
  const [nodeProgress, setNodeProgress] = useState(0)
  const provider = useProvider()

  const strongLogo = (
    <Image
      src="/crypto-logo/strong.webp"
      alt="strong"
      width="30px"
      height="30px"
    />
  )

  useEffect(() => {
    if (provider) {
      getHeldShares(provider).then((shares) => {
        setUserShares(shares)
      })
      getInvestmentFund(provider).then((balance) => {
        setInvestFund(balance)
      })
      getRewardFund(provider).then((balance) => {
        setRewardFund(balance)
      })
      getSharesIssued(provider).then((amount) => {
        setSharesIssued(amount)
      })
    }
    return () => {
      setUserShares(0)
      setInvestFund(0)
      setRewardFund(0)
      setSharesIssued(0)
    }
  }, [provider])

  /**
   * Calculate the progress we made to buying a node in percent
   */
  useEffect(() => {
    const cg = new CoinGecko()
    cg.simple
      .price({ ids: 'strong', vs_currencies: 'usd', include_24hr_change: true })
      .then((data: CoinGeckoPrice) => {
        const strongprice: number = data.data.strong.usd
        const np = strongprice * 10
        const tp = (100 * investFund) / np
        setNodeProgress(tp)
      })
    return () => {
      setNodeProgress(0)
    }
  }, [investFund])

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

  /**
   * Pretty Progress bar for the node progress
   */
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }))

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      justifyContent="space-between"
    >
      <HeroItem
        icon={<EventOutlinedIcon fontSize="large" />}
        title="Next payday"
        subtitle="Distributed one time per week"
      >
        <span style={{ fontWeight: 'bold', fontSize: 31 }}>🤷</span>
      </HeroItem>
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
        <span
          style={{ fontWeight: 'bold', fontSize: 31 }}
        >{`~ ${earnings.toFixed(2)} USDT`}</span>
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
