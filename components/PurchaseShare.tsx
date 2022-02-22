// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { BigNumber, ethers } from 'ethers'
import Moralis from 'moralis'
import { useSnackbar } from 'notistack'
import { FC, useCallback, useEffect, useState } from 'react'
import { ABI_ERC20, ABI_SUNBLOCK } from '../programs/contracts'
import {
  CONTRACT_ADDRESS_SUNBLOCK,
  TOKEN_ADDRESS_DEMOERC20
} from '../programs/polygon'
export const PurchaseShares: FC = () => {
  const DEFAULT_SHARE_VALUE = 10
  const TXT_NO_ALLOWANCE = 'No allowanced'

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  // What is the users current allowance
  const [allowance, setAllowance] = useState('')
  const [allowanceNeeded, setAllowanceNeeded] = useState(false)
  const [spendlimitWarning, setSpendlimitWarning] = useState(Boolean)
  const [shareAmount, setShareAmount] = useState(DEFAULT_SHARE_VALUE)

  const eventListner = useCallback(() => {
    const totalcost = shareAmount * 10 //TODO: Get shareprice from chain. Not hardcoded
    const numAllowance = Number.parseInt(allowance)
    if (totalcost>numAllowance) {
      setSpendlimitWarning(true)

    }
  }, [shareAmount, allowance]);

  useEffect(() => {
    // setShareAmount(10)
    const enableEmitter = Moralis.onWeb3Enabled(() => {
      updateAllowance()
    })
    const unsub = Moralis.onAccountChanged((account) => {
      updateAllowance()
    })
    return () => {
      enableEmitter()
      unsub()
    }
  }, [])

  async function updateAllowance(): Promise<void> {
    const w3 = Moralis.web3!
    const signer = w3.getSigner()
    const walletAddress = signer.getAddress()
    const erc20 = new ethers.Contract(
      TOKEN_ADDRESS_DEMOERC20,
      ABI_ERC20,
      signer
    )
    const amount: BigNumber = await erc20.allowance(
      walletAddress,
      CONTRACT_ADDRESS_SUNBLOCK
    )

    const allowanceWai = amount
    const tokenAmount = ethers.utils.formatEther(allowanceWai)
    const tokenNumber = Number.parseInt(tokenAmount)
    try {
      if ( tokenNumber > Number.MAX_SAFE_INTEGER) {
        setAllowance('Allowance is too damn high!')
        setSpendlimitWarning(true)
        setAllowanceNeeded(false)
      } else if (tokenNumber === 0) {
        setAllowance(`Spendlimit is ${tokenAmount} USDC. 💔`)
        setSpendlimitWarning(true)
        setAllowanceNeeded(true)
      } else {
        setAllowance(`Spendlimit set to ${tokenAmount} USDC`)
        setSpendlimitWarning(false)
        setAllowanceNeeded(false)
      }
    } catch (error) {
      console.log(error)
      setAllowance('Allowance is too damn high!')
      setSpendlimitWarning(true)
    }
  }

  function removeAllowance() {
    //TODO #3 Implement removal of allowance
  }

  async function addAllowance(amount: number) {
    const w3 = await Moralis.enableWeb3()
    const signer = w3.getSigner()
    const erc20 = new ethers.Contract(
      TOKEN_ADDRESS_DEMOERC20,
      ABI_ERC20,
      signer
    )
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_SUNBLOCK,
      ABI_SUNBLOCK,
      signer
    )
    const shareCostWei: BigNumber = await contract.purchaseTokensPrice(
      TOKEN_ADDRESS_DEMOERC20
    )
    const tokenDecimals: number = await erc20.decimals()
    const totalWei = Moralis.Units.Token(
      shareCostWei.toNumber() * amount,
      tokenDecimals
    )
    console.log(tokenDecimals)
    console.log(shareCostWei)
    console.log(totalWei)
    await erc20.approve(CONTRACT_ADDRESS_SUNBLOCK, totalWei)
  }

  async function purchaseShare(amount: number) {
    //TODO: #7 Increse spendlimit if purchase is over set limit
    //TODO: #4 Validate buyshare amount with allowance
    //TODO: #5 Consume investment event from the chain
    const w3 = await Moralis.enableWeb3()
    const signer = w3.getSigner()
    const sunblockContract = new ethers.Contract(
      CONTRACT_ADDRESS_SUNBLOCK,
      ABI_SUNBLOCK,
      signer
    )
    try {
      await sunblockContract.buyShares(TOKEN_ADDRESS_DEMOERC20, amount)
    } catch (error) {
      console.log(error)
      enqueueSnackbar("🙁 That didn't work as expected... Try again?", {
        variant: 'error',
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      })
    }
    sunblockContract.on(
      'Investment',
      async (shareCount, price, address, event) => {
        console.log(`Event: ${event} for address ${address}`)
        console.log(event)
        enqueueSnackbar(`👍 Done! You now got ${shareCount} shares. Nice!`, {
          variant: 'success',
          anchorOrigin: { horizontal: 'center', vertical: 'top' },
        })
      }
    )
  }

  const purchaseButton = (
    <Button
      color="warning"
      onClick={() => purchaseShare(shareAmount)}
      size="small"
      variant="contained"
    >
      Buy shares
    </Button>
  )
  const allowanceButton = (
    <Button
      onClick={() => addAllowance(shareAmount)}
      size="small"
      variant="contained"
    >
      Approve spend
    </Button>
  )

  return (
    <Stack direction="column">
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-helperText"
          label="Shares"
          defaultValue={shareAmount.toString()}
          onChange={(v) => setShareAmount(Number.parseInt(v.target.value))}
          type="number"
        />
        {allowanceNeeded ? allowanceButton : purchaseButton}
      </Stack>
      <Box sx={{ paddingTop: 2 }}>
        <Chip
          title="Revoke allowance for sunblock"
          label={allowance === '0' ? TXT_NO_ALLOWANCE : allowance}
          clickable={allowance === '0' ? true : false}
          onDelete={allowance === '0' ? undefined : removeAllowance}
          color={spendlimitWarning ? 'error' : 'default'}
        />
      </Box>
    </Stack>
  )
}
