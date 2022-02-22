// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Stack } from '@mui/material'
import { FC } from 'react'
import { PurchaseShares } from '../PurchaseShare'
import { HeroItem } from './HeroItem'

export const HeroRow: FC = () => {
  return (

    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}  justifyContent='space-between' >
      <HeroItem title="Next payday" subtitle='Distributed one time per week'>
        <span style={{ fontWeight: 'bold', fontSize: 31 }}>12 Feb 2022</span>
      </HeroItem>
      <HeroItem title="Pending reward" subtitle='22 shares'>
        <span style={{ fontWeight: 'bold', fontSize: 31 }}>~23.22 USDC</span>
      </HeroItem>

      <HeroItem title="Pending reward" subtitle='22 shares'>
        <span style={{ fontWeight: 'bold', fontSize: 31 }}>~23.22 USDC</span>
      </HeroItem>
      <HeroItem title="Purchase shares" subtitle='Each share is 10 USDC' promote >
        <PurchaseShares />
      </HeroItem>
    </Stack>



  )}
