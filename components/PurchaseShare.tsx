// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TransactionResponse } from '@ethersproject/abstract-provider'
import {
  alpha,
  Backdrop,
  Button,
  CircularProgress,
  colors
} from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { ethers } from 'ethers'
import { useSnackbar } from 'notistack'
import React, { FC, useEffect, useState } from 'react'
import ContractConnector from '../blockchain/ContractConnector'
import { useGlobalState } from '../blockchain/networks'
import { hooks } from '../connectors/metamask'
import { ABI_SUNBLOCK_CUBE } from '../contracts/abi/sunblock'
import { CONTRACT_ADDRESS_CUBE } from '../programs/polygon'
import AllowancePill from './AllowancePill'

const DEFAULT_SHARE_VALUE = 10
const { useIsActive, useProvider } = hooks

export const PurchaseShares: FC = () => {
  const provider = useProvider()
  const isWalletActive = useIsActive()

  const closeSpinner = () => {
    setOpen(false)
  }
  const openSpinner = () => {
    setOpen(!open)
  }

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  // ===== //
  // STATE //
  // ===== //
  const [usdt, setUsdt] = useState(0)
  const [activeTx, setActiveTx] = useState<TransactionResponse>()
  const [stopPurchase, setStopPurchase] = useState(false)
  const [shareAmount, setShareAmount] = useState(DEFAULT_SHARE_VALUE)
  const [basketPrice, setBasketPrice] = useState(0)
  const [balance, setBalance] = useState(0)
  const [open, setOpen] = useState(false)
  const [sharePrice, setSharePrice] = useState(0)
  const [chainid, setChainid] = useGlobalState('chainid')

  const isUnderfunded = basketPrice > Number(balance)

  async function purchaseShare(amount: number) {
    if (provider === undefined) return
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()
    const sunblockContract = new ethers.Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      signer
    )
    try {
      const response: TransactionResponse = await sunblockContract.buyShares(
        amount
      )
      setActiveTx(response)
      openSpinner()
    } catch (error) {
      closeSpinner()
      enqueueSnackbar("🙁 That didn't work as expected... Try again?", {
        variant: 'error',
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      })
    }
    const filter = sunblockContract.filters.SharesIssued(signerAddress, null)
    provider.once('block', () => {
      sunblockContract.once(filter, async (buyer: string, amount) => {
        console.log(`BUY EVENT: Address,${buyer} Amount,${amount}`)

        if (signerAddress !== buyer) {
          return
        }
        closeSpinner()
        enqueueSnackbar(`👍 Done! You now got ${amount} new share(s). Nice!`, {
          variant: 'success',
          anchorOrigin: { horizontal: 'center', vertical: 'top' },
        })
      })
    })
  }

  const handleShareTextUpdate = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const sharesNum = Number.parseInt(e.target.value)

    if (Number.isNaN(sharesNum) || sharesNum < 0) {
      setShareAmount(0)
      return
    }

    setShareAmount(sharesNum)
    setBasketPrice(sharePrice * sharesNum)

    // Check if price is over wallet holding. Disable if to expensive
    if (basketPrice > usdt) {
      setStopPurchase(true)
    } else {
      setStopPurchase(false)
    }
  }

  useEffect(() => {
    const cube = new ContractConnector(chainid)
    cube
      .getSharePrice()
      .then((price) => {
        setSharePrice(price)
        setBasketPrice(price * DEFAULT_SHARE_VALUE)
      })
      .catch(() => console.error)
    return () => {
      setSharePrice(0)
      setBasketPrice(0)
    }
  }, [chainid])

  useEffect(() => {
    if (provider) {
      const cube = new ContractConnector(chainid)
      provider
        .getSigner()
        .getAddress()
        .then((address) => {
          cube
            .getUSDTBalance(address)
            .then((amount) => {
              setBalance(amount)
            })
            .catch(() => console.error)
        })
        .catch(() => console.error)
    }
    return () => {
      setBalance(0)
      setSharePrice(0)
    }
  }, [provider, chainid])

  return (
    <Stack direction="column">
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-helperText"
          label="Shares"
          defaultValue={shareAmount.toString()}
          onChange={handleShareTextUpdate}
          type="number"
          helperText={`Total cost: ${basketPrice}`}
        />
        <Button
          color="warning"
          onClick={() => {
            purchaseShare(shareAmount)
          }}
          size="small"
          variant="contained"
          disabled={isUnderfunded || shareAmount === 0 || !isWalletActive}
        >
          {isUnderfunded ? `Low funds 🙁` : `Buy shares`}
        </Button>
      </Stack>

      <Box sx={{ paddingTop: 2 }}>
        <AllowancePill shareCost={basketPrice} />
      </Box>
      <Backdrop
        sx={{
          backgroundColor: alpha(colors.deepPurple[900], 0.9),
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClick={closeSpinner}
      >
        <Stack direction="column" spacing={4} alignItems="center">
          <h3>Transaction in progress...</h3>
          <CircularProgress color="inherit" />
          <Button
            target="_blank"
            rel="noopener"
            variant="outlined"
            href={`https://polygonscan.com/tx/${activeTx?.hash}`}
          >
            See on polyscan
          </Button>
        </Stack>
      </Backdrop>
    </Stack>
  )
}
