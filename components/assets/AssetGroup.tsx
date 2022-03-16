// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import GroupIcon from '@mui/icons-material/Group'
import PieChartTwoToneIcon from '@mui/icons-material/PieChartTwoTone'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import CoinGecko from 'coingecko-api'
import { FC, useEffect, useState } from 'react'
import { CoinGeckoPrice } from '../../blockchain/coingecko'
import { getInvestmentFund, getRewardFund, getShareholderCount, getSharePrice, getSharesIssued } from '../../blockchain/query'
import { hooks } from '../../connectors/metamask'
import { formatWeiToNumber } from '../../utils/formaters'
import { AssetItem } from './AssetItem'


let eth: any
const { useProvider } = hooks

export const AssetGroup: FC = () => {
  const provider = useProvider()
  const usdc = './crypto-icons/usdc.svg'
  const strong = './crypto-icons/strong.webp'

  /**
   * Token prices
   */
  const [strongPrice, setStrongPrice] = useState(0)
  const [strongChange, setStrongChange] = useState(0)


  const [heldShares, setHeldShares] = useState(0)
  const [investorCount, setInvestorCount] = useState(0)
  const [investFund, setInvestFund] = useState(0)
  const [rewardFund, setRewardFund] = useState(0)
  const [sharesIssued, setSharesIssued] = useState(0)
  const [totalInvestment, setTotalInvestment] = useState(0)
  const [sharePrice, setSharePrice] = useState(0)

  useEffect(() => {
    if (provider) {
      getInvestmentFund(provider).then((balance) => {
        setInvestFund(balance)
      })
      getSharesIssued(provider).then((shares) => {
        setSharesIssued(shares)
      }).catch((e) => console.log(e)
      )
      getSharePrice(provider).then((price) => {
          setSharePrice(formatWeiToNumber(price))
      })
      getRewardFund(provider).then((reward) => {
        setRewardFund(reward)
      })
      getShareholderCount(provider).then((count) => {
        setInvestorCount(count)
      })
    }

    return () => {
        setInvestFund(0)
        setSharesIssued(0)
        setSharePrice(0)
        setTotalInvestment(0)
        setRewardFund(0)
        setInvestorCount(0)
    }
  }, [provider])

  useEffect(() => {
    const CoinGeckoClient = new CoinGecko();
    CoinGeckoClient.simple.price({ids:'strong', vs_currencies:'usd', include_24hr_change:true}).then((data:CoinGeckoPrice) => {
      setStrongPrice(data.data.strong.usd)
      setStrongChange(data.data.strong.usd_24h_change)

    })
    return () => {
      setStrongPrice(0)
      setStrongChange(0)
    }
  },[])

  useEffect(() => {
      setTotalInvestment(sharePrice * sharesIssued)
    return () => {
      setTotalInvestment(0)
    }
  }, [sharePrice, sharesIssued])


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
              title="Capital waiting to be invested"
              value={`${investFund.toString()} USDC`}
              avatar={usdc}
            />
            <AssetItem
              title="Rewards accumulated"
              value={`${rewardFund.toString()} STRONG `}
              avatar={strong}
            />
            <AssetItem
              title="Total lifetime investment"
              value={`${totalInvestment.toString()} USDC`}
              avatar={usdc}
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
          >
            <AssetItem
              title="Total amount of shares issued"
              value={`${sharesIssued.toString()} shares`}
              icon={<PieChartTwoToneIcon fontSize="large" color='info'/>}
            />
            <AssetItem
              title="Community shareholders"
              value={`${investorCount} Sunbathers`}
              icon={<GroupIcon fontSize='large' color='info'/>}
            />
            <AssetItem
              title="Strong price"
              value={`${strongPrice}`}
              avatar={strong}
            />
          </Stack>

        </Stack>
      </Container>
    </>
  )
}
