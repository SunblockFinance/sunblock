// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Stack } from '@mui/material'
import { FC } from 'react'
import { hooks } from '../../connectors/metamask'
import { PurchaseShares } from '../PurchaseShare'
import { HeroItem } from './HeroItem'

const {useProvider} = hooks

export const HeroRow: FC = () => {
  // const [strongAmount, setStrongAmount] = useState(0)
  // const provider = useProvider()
  // if (provider) {
  //  async ( ) => {
  //   const strongBalance = await getStrongBalance(provider)
  //   if (strongBalance) setStrongAmount(strongBalance)
  //  }
  // }

  return (

    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}  justifyContent='space-between' >
      <HeroItem title="Next payday" subtitle='Distributed one time per week'>
        <span style={{ fontWeight: 'bold', fontSize: 31 }}>TBC</span>
      </HeroItem>
      <HeroItem title="Pending reward" subtitle='22 shares'>
        <span style={{ fontWeight: 'bold', fontSize: 31 }}>{`0 STRONG`}</span>
      </HeroItem>

      <HeroItem title="Pending reward" subtitle='22 shares'>
        <span style={{ fontWeight: 'bold', fontSize: 31 }}>~23.22 USDC</span>
      </HeroItem>
      <HeroItem title="Purchase shares" subtitle='Each share is 10 USDC' promote >
        <PurchaseShares />
      </HeroItem>
    </Stack>



  )}
