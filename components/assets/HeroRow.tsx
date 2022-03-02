// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Stack } from '@mui/material'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { getHeldShares, getStrongBalance } from '../../blockchain/query'
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
  const provider = useProvider()




  const strongLogo = <Image src='/strong-strong-logo.webp' alt='usdc' width='30px' height='30px'/>

  useEffect(() => {
    if (provider) {
     getStrongBalance(provider).then((balance) => {
      setStrongAmount(balance)
     })
     getHeldShares(provider).then((shares) => {
       setUserShares(shares)
     })

    }
    return () => {
      setStrongAmount(0)
      setUserShares(0)
    }
  }, [provider])

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      justifyContent="space-between"
    >
      <HeroItem title="Next payday" subtitle="Distributed one time per week">
        <span style={{ fontWeight: 'bold', fontSize: 31 }}>Waiting for first node ⏳</span>
      </HeroItem>
      <HeroItem title="Pending reward" subtitle={`${strongNodes} nodes owned by us`}>
        <span style={{ fontWeight: 'bold', fontSize: 31 }}>{` ${strongAmount} STRONG`}</span>
      </HeroItem>

      <HeroItem title="Estimated earning" subtitle={`${userShares} shares owned by you`}>
        <span style={{ fontWeight: 'bold', fontSize: 31 }}>{`~${earnings} USDC`}</span>
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
