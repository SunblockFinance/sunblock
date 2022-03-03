// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Stack, styled } from '@mui/material'
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress'
import CoinGecko from 'coingecko-api'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { CoinGeckoPrice } from '../../blockchain/coingecko'
import { getHeldShares, getInvestmentFund, getStrongBalance } from '../../blockchain/query'
import { hooks } from '../../connectors/metamask'
import { PurchaseShares } from '../PurchaseShare'
import { HeroItem } from './HeroItem'

const { useProvider } = hooks

export const HeroRow: FC = () => {
  const [strongAmount, setStrongAmount] = useState(0)
  const [strongNodes, setStrongNodes] = useState(0)
  const [userShares, setUserShares] = useState(0)
  const [earnings, setEarnings] = useState(0)
  const [investFund, setInvestFund] = useState(0)
  const [nodeProgress, setNodeProgress] = useState(0)
  const provider = useProvider()

  const strongLogo = (
    <Image
      src="/strong-strong-logo.webp"
      alt="usdc"
      width="30px"
      height="30px"
    />
  )

  useEffect(() => {
    if (provider) {
      getStrongBalance(provider).then((balance) => {
        setStrongAmount(balance)
      })
      getHeldShares(provider).then((shares) => {
        setUserShares(shares)
      })
      getInvestmentFund(provider).then((balance) => {
        setInvestFund(balance)
      })
    }
    return () => {
      setStrongAmount(0)
      setUserShares(0)
      setInvestFund(0)
    }
  }, [provider])


  useEffect(() => {
    console.log('Loop check')
    const cg = new CoinGecko()
    cg.simple
      .price({ ids: 'strong', vs_currencies: 'usd', include_24hr_change: true })
      .then((data: CoinGeckoPrice) => {
        const strongprice:number = data.data.strong.usd
        const np = strongprice*10
        const tp = (100 * investFund) / np
        console.log("TP:",tp);
        console.log("IF:",investFund);
        console.log("NP:",np);

        setNodeProgress(tp)
      })
  }, [investFund])

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
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
      <HeroItem title="Next payday" subtitle="Distributed one time per week">
        <span style={{ fontWeight: 'bold', fontSize: 31 }}>No nodes, yet!</span>
      </HeroItem>
      <HeroItem
        title="Strong nodes"
        subtitle={`${strongNodes} nodes owned by us`}
      >
        <Stack direction="column" alignItems="center" spacing={2}>
          <span style={{ fontWeight: 'bold', fontSize: 31 }}>Nodes: 0</span>
          Left until new node:
          <BorderLinearProgress
            sx={{ minWidth: 200 }}
            variant="determinate"
            value={nodeProgress}
          />
        </Stack>
      </HeroItem>

      <HeroItem
        title="Estimated earning"
        subtitle={`${userShares} shares owned by you`}
      >
        <span
          style={{ fontWeight: 'bold', fontSize: 31 }}
        >{`~ ${earnings} USDC`}</span>
      </HeroItem>
      <HeroItem
        title="Purchase shares"
        subtitle="Each share is 10 USDC"
        promote
      >
        <PurchaseShares />
      </HeroItem>
    </Stack>
  )
}
