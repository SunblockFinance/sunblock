// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { FC, useEffect, useState } from 'react'
import { getInvestmentFund, getSharesIssued } from '../../blockchain/query'
import { hooks } from '../../connectors/metamask'
import { AssetItem } from './AssetItem'

let eth: any
const { useProvider } = hooks

export const AssetGroup: FC = () => {
  const provider = useProvider()
  const usdc = './usdc-logo.webp'
  const strong = './strong-strong-logo.webp'

  const [heldShares, setHeldShares] = useState(0)
  const [investFund, setInvestFund] = useState(0)
  const [sharesIssued, setSharesIssued] = useState(0)

  useEffect(() => {
    if (provider) {
      getInvestmentFund(provider).then((balance) => {
        setInvestFund(balance)
      })
      getSharesIssued(provider).then((shares) => {
        setSharesIssued(shares)
      })
    }

    return () => {
        setInvestFund(0)
        setSharesIssued(0)
    }
  }, [provider])

  return (
    <>
      <Container
        sx={{
          outlineStyle: 'solid',
          outlineColor: 'gray',
          borderRadius: '5px',
          backgroundColor: 'rgba(56,71,80,0.5)',
          backdropFilter: 'blur(8px)',
          padding: '20px',
          width: '100%',
        }}
      >
        <Stack spacing={2} direction="column">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
          >
            <AssetItem
              title="Funds waiting to be invested"
              value={`${investFund.toString()} USDC`}
              avatar={usdc}
            />
            <AssetItem
              title="Total amount of shares issued"
              value={`${sharesIssued.toString()} shares`}
              icon={PieChartOutlineIcon}
            />
            <AssetItem
              title="Total investment"
              value="$123,000"
              avatar={usdc}
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
          >
            <AssetItem
              title="Community shareholders"
              value="125"
              avatar={usdc}
            />
            <AssetItem
              title="Capital Waiting To Be Invested"
              value="$122"
              avatar={usdc}
            />
            <AssetItem
              title="Rewards accumulated"
              value="122.223 STRONG"
              avatar={strong}
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
          >
            <AssetItem
              title="Community shareholders"
              value="125"
              avatar={usdc}
            />
            <AssetItem
              title="Capital Waiting To Be Invested"
              value="$122"
              avatar={usdc}
            />
            <AssetItem
              title="Rewards accumulated"
              value="122.223 STRONG"
              avatar={strong}
            />
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
